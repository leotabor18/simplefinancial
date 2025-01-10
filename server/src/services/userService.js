import { init, Organizations, Properties, Roles, Users } from "@kinde/management-api-js";
import db from 'better-sqlite3-helper';
import moment from 'moment';
import { throwError } from '../middleware/error.js';
import User from '../model/userModel.js';
import { KINDE_USER_PROPERTY_KEYS, USER_ORGANIZATIONS, USER_PROPERTIES, USER_ROLE_KEYS, USER_ROLES } from "../util/constants.js";


// TODO: Add pagination
const getUsers = async(params, next) => {
  try {
    const query = `
      SELECT * FROM user
      WHERE
        (lastName LIKE '%' || ? || '%' OR firstName LIKE '%' || ? || '%')
      ORDER BY
        ${params.sortField} COLLATE NOCASE ${params.sortOrder}
      LIMIT ?
      OFFSET ?;
    `

    console.log('Query', query, params)
    return db().query(query, params.search, params.search, params.size, params.offset);
  } catch (e) {
    next(e)
  }
}

const getManagementUsers = async (next) => {
  try {
    const organizationResponse = await Organizations.getOrganizations();
    const organization = organizationResponse.organizations;
    if (!organization.length) {
      throwError(500, 'Failed to get the organization list');
    }

    const management = organization.find(item => item.name === USER_ORGANIZATIONS.MANAGEMENT);
    if (!management) {
      throwError(500, 'Failed to get the organization: Management org not found!');
    }
    const orgCode = management.code;
    
    const organizationUserResponse = await Organizations.getOrganizationUsers({ orgCode: orgCode });
    const orgUsers = organizationUserResponse.organization_users;

    return orgUsers;
  } catch(e) {
    next(e);
  }
}

const getUserInfoByUserId = async (userId, next) => {
  try {
    const userResponse = await Users.getUsers({ userId });
    if (!userResponse?.users?.length) {
      return new User();
    }

    const user = userResponse.users[0];
    const userData = new User({
      userId       : userId,
      firstName    : user.first_name,
      lastName     : user.last_name,
      email        : user.email,
    });

    return userData;
  } catch (e) {
    next(e)
  }
}

const getUserByUserId = async (userId, userType, next) => {
  try {
    const userResponse = await Users.getUsers({ userId });
    if (!userResponse?.users?.length) {
      throwError(404, `User with userId ${userId} not found!`);
    }

    const organization = await getUserOrganization(userType);

    const userRoleResponse = await Organizations.getOrganizationUserRoles({ userId, orgCode: organization.code });

    const user = userResponse.users[0];
    const userData = new User({
      userId       : userId,
      firstName    : user.first_name,
      lastName     : user.last_name,
      email        : user.email,
      role:  {
        orgCode: organization.code,
        name: userRoleResponse.roles[0]?.name
      },
    });

    return userData;
  } catch (e) {
    next(e)
  }
}

const getUserByEmail = async (email, next) => {
  try {
    const userResponse = await Users.getUsers({ email });
    if (!userResponse?.users?.length) {
      throwError(404, `User with email ${email} not found!`);
    }

    return userResponse;
  } catch (e) {
    next(e)
  }
}

const createUser = async(req, next) => {
  const { body, user: userContext  } = req;
  const { id } = userContext;

  const entityData = new User({
    ...body,
    whoAdded: id,
    whoUpdated: id,
    whenAdded: moment().unix(),
    ts: moment().unix(),
  });

  try {
    const isUserExist = await isKindeUserExist(entityData.email, next);
    const isUserRecordExist = db().queryFirstRow('SELECT * FROM user WHERE email=?', entityData.email)
    
    if (isUserExist || isUserRecordExist) {
      throwError(409, `${USER_ROLES.MANAGEMENT} with email ${entityData.email} already exists!`);
    }

    await createKindeUser(next, USER_ROLES.MANAGEMENT, entityData);

    delete entityData.userId;
    delete entityData.role;

    const rowId = db().insert('user', entityData)

    return db().queryFirstRow('SELECT * FROM user WHERE rowid=?', rowId);
  } catch (e) {
    next(e);
  }
}

const createKindeUser = async (next, userType, entityData) => {
  try {
    const userOrganization = await getUserOrganization(userType);
    const data = {
      requestBody: {
        profile: {
          given_name: entityData.firstName,
          family_name: entityData.lastName,
        },
        organization_code: userOrganization.code,
        identities: [
          {
            type: "email",
            details: {
              email: entityData.email,
            },
          },
        ],
      },
    };

    const createdUserResponse = await Users.createUser(data);
    const userId = createdUserResponse.id;
    
    const userRole = await getUserRole(userType);
    
    await assignRoleToUser(userOrganization.code, userId, userRole.id);
    
    return createdUserResponse;
  } catch(e) {
    console.debug("DEBUG: ", e);
    next(e)
  }
}

const updateKindeUser = async (userId, next, entityData) => {
  try {
    const data = {
      id: userId,
      requestBody: {
        given_name: entityData.firstName,
        family_name: entityData.lastName,
        // is_suspended: false
        // Email??
      },
    };

    return await Users.updateUser(data);;
  } catch(e) {
    console.debug("DEBUG: ", e);
    next(e)
  }
}

const getUserOrganization = async(userType) => {
  const organizationResponse = await Organizations.getOrganizations();
  const entityOrg = organizationResponse.organizations.find(
    item => item.name === USER_ORGANIZATIONS[userType]
  );

  if (!entityOrg) {
    throwError(404, `Organization for ${userType} not found`);
  }

  return entityOrg;
}

const getUserRole = async (userType) => {
  const roleResponse = await Roles.getRoles();
  const role = roleResponse.roles.find(
    item => item.key === USER_ROLE_KEYS[userType]
  );

  if (!role) {
    throwError(404, `Role for ${userType} not found`);
  }

  return role;
}

const assignRoleToUser = async(orgCode, userId, roleId) => {
  const organizationUserRoleData = {
    orgCode: orgCode,
    userId: userId,
    requestBody: {
      role_id: roleId,
    },
  };

  await Organizations.createOrganizationUserRole(organizationUserRoleData);
}

const isKindeUserExist = async (email, next) => {
  try {
    const kindeClientResponse = await Users.getUsers({ email: email });
    const { users } = kindeClientResponse;
    return users && users.length;
  } catch (e) {
    next(e)
  }
}

const updateUser = async(req, next) => {
  const { body, user: userContext, params} = req; 
  const { id } = userContext;
  const { userId } = params;
  
  try {
    const userRecord = db().queryFirstRow('SELECT * FROM user WHERE userId=?', userId);
    if (!userRecord) {
      throwError(404, `User with userId ${userId} not found!`);
    }

    const entityData = new User({
      ...userRecord,
      ...body,
      ts: moment().unix(),
      whoUpdated: id
    });

    const kindeUserResponse = await Users.getUsers({ email: userRecord.email });
    const { users } = kindeUserResponse;
    if (!(users && users.length)) {
      throwError(404, `User with userId ${userId} not found!`);
    }

    
    const userDataEmail = userRecord.email;
    const userEmail = entityData.email;
    
    if (userDataEmail !==  userEmail) {
      const isUserExist = await isKindeUserExist(userEmail, next);
      const isUserRecordExist = db().queryFirstRow('SELECT * FROM user WHERE email=? AND userId != ?', userEmail, entityData.userId);
      if (isUserExist || isUserRecordExist) {
        throwError(409, `${USER_ROLES.MANAGEMENT} with email ${userEmail} already exists!`);
      }
    }
    const kindeUser = users[0];

    await updateKindeUser(kindeUser.id, next, entityData);
    const recordId = entityData.userId;

    delete entityData.userId;
    delete entityData.role;

    const rowId = db().update('user', entityData, { userId: recordId });

    return db().queryFirstRow('SELECT * FROM user WHERE rowid=?', rowId);
  } catch (error) {
    next(error);
  }
}

const deleteUser = (userId) => {
  let user = db().queryFirstRow('SELECT * FROM user WHERE userId=?', userId);
  if (!user) {
    throwError(404, `User with userId ${userId} not found!`);
  }

  try {
    db().delete('user', { userId });
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      throwError(409, e.message)
    }
    throwError(500, e.message)
  }
}


export {
  createUser,
  deleteUser,
  getUserByUserId,
  getUsers,
  updateUser,
  createKindeUser,
  updateKindeUser,
  isKindeUserExist,
  getManagementUsers,
  getUserByEmail,
  getUserInfoByUserId
};
