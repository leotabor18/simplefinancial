import { Users } from '@kinde/management-api-js';
import db from 'better-sqlite3-helper';
import moment from 'moment';
import { throwError } from '../middleware/error.js';
import ClientCategory from '../model/clientCategoryModel.js';
import Client from '../model/clientModel.js';
import TeamClient from '../model/teamClientModel.js';
import { USER_ROLES } from '../util/constants.js';
import { BusinessService, UserService } from './index.js';

// TODO: Add pagination
const getClients = async(params, next) => {
  try {
    const query = `
      SELECT * FROM client
       WHERE
        (lastName LIKE '%' || ? || '%' OR firstName LIKE '%' || ? || '%')
      ORDER BY
        ${params.sortField} COLLATE NOCASE ${params.sortOrder}
      LIMIT ?
      OFFSET ?;
      `
    let clients = db().query(query, params.search, params.search, params.size, params.offset)

    clients = await getClientTeamById(clients);
    clients = await getClientCategories(clients);
    clients = await getClientBusinesses(clients);

    return clients;
  } catch (e) {
    next(e)
  }
}

const getClientCategories = async (clients) => {
  return clients.map(client => {
    const query = `
      SELECT categoryId, categoryName AS name FROM client_categories
       WHERE
        clientId = ?
      `
    let categories = db().query(query, client.clientId);
    categories = categories.filter(item => item.name);
    return {
      ...client,
      categories
    }
  })
}

const getClientBusinesses = async (clients) => {
  return clients.map(client => {
    const query = `
      SELECT businessId, businessName AS name, businessTaxNumber as taxNumber
      FROM client_business
      WHERE
        clientId = ?
      `
    let businesses = db().query(query, client.clientId);
    businesses = businesses.filter(item => item.name);
    return {
      ...client,
      businesses
    }
  })
}

const getClientTeamById = async (clients) => {
  let clientIds = clients.map(client => client.clientId);

  const query = `
    SELECT * FROM teamClient
    WHERE clientId IN (${clientIds.map(() => '?').join(',')})
  `
  const clientTeams = db().query(query, clientIds);
  const uniqueUserIds = [...new Set(clientTeams.map(item => item.userId))];

  let users = [];
  for (const userId of uniqueUserIds) {
    const user = await UserService.getUserInfoByUserId(userId);
    users.push(user);
  }
  const newClientTeams = clientTeams.map(team => {
    const userInfo = users.find(user => user.userId === team.userId);
    return {
      ...team,
      ...userInfo,
    };
  });
  const newClients = clients.map(client => {
    const teams = newClientTeams.filter(team => team.clientId === client.clientId);
    return {
      ...client,
      teams: teams
    }
  })

  return newClients
}

const getClientByClientId = async(clientId, next) => {
  try {
    return await UserService.getUserByUserId(clientId, next);
  } catch(e) {
    next(e)
  }
}

const createClient = async (req, next) => {
  try {
    const { body, user: userContext } = req;
    const { id } = userContext;
    const { categories = [], teams = [], businesses = [] } = body;

    const timestamp = Date.now();
    const entityData = new Client({
      ...body,
      whoAdded: id,
      whoUpdated: id,
      whenAdded: timestamp,
      ts: timestamp,
    });

    const email = entityData.email;

    const isKindeUserExist = await UserService.isKindeUserExist(email, next);
    const isClientExist = db().queryFirstRow('SELECT * FROM client WHERE email=?', email);
    if (isKindeUserExist || isClientExist) {
      throwError(409, `${USER_ROLES.CLIENT} with email ${email} already exists!`);
    }

    const kindeUser = await UserService.createKindeUser(next, USER_ROLES.CLIENT, entityData);
    const userId = kindeUser.id;
    if (!userId) {
      throwError(500, `Failed to create client account.`);
    }

    entityData.update({ userId });

    // Insert client into the database
    const rowId = db().insert('client', entityData);

    // Retrieve the created client record
    const client = db().queryFirstRow('SELECT * FROM client WHERE rowid=?', rowId);
    const { clientId } = client;

    // Process and insert categories
    if (Array.isArray(categories) && categories.length) {
      for (const category of categories) {
        const { categoryId } = category;
        const clientCategoryData = new ClientCategory({
          categoryId,
          clientId,
        });
        delete clientCategoryData.clientCategoryId;
        db().insert('clientCategory', clientCategoryData);
      }
    }

    // Process and insert teams
    if (Array.isArray(teams)) {
      for (const team of teams) {
        const { userId: teamUserId } = team;
        const teamClientData = new TeamClient({
          userId: teamUserId,
          clientId,
        });
        delete teamClientData.teamClientId;
        db().insert('teamClient', teamClientData);
      }
    }

    // Process and insert teams
    if (Array.isArray(businesses)) {
      for (const business of businesses) {
        const { businessId } = business;
        const clientBusinessReq = {
          clientId,
          businessId
        }
        BusinessService.createClientBusiness(clientBusinessReq);
      }
    }
    console.log('Client with ID ', clientId, ' has been successfuly created.')
    return client;
  } catch (error) {
    console.error('Error in createClient:', error);
    next(error);
  }
};

const updateClient = async(req, next) => {
  const { body, user: userContext, params} = req; 
  const { id } = userContext;
  const { clientId } = params;

  try {
    const clientRecord = db().queryFirstRow('SELECT * FROM client WHERE clientId=?', clientId);
    if (!clientRecord) {
      throwError(404, `Client with clientId ${clientId} not found!`);
    }

    const entityData = new Client({
      ...clientRecord,
      ...body,
      ts: moment().unix(),
      whoUpdated: id
    });

    const kindeUserResponse = await Users.getUsers({ email: clientRecord.email });
    const { users } = kindeUserResponse;
    if (!(users && users.length)) {
      throwError(404, `Client with client ${clientId} not found!`);
    }

    const clientDataEmail = clientRecord.email;
    const clientEmail = entityData.email;
    
    if (clientDataEmail !==  clientEmail) {
      const isUserExist = await UserService.isKindeUserExist(clientEmail, next);
      const isClientRecordExist = db().queryFirstRow('SELECT * FROM client WHERE email=? AND clientId != ?', clientEmail, entityData.clientId);
      if (isUserExist || isClientRecordExist) {
        throwError(409, `${USER_ROLES.CLIENT} with email ${clientEmail} already exists!`);
      }
    }
    const kindeUser = users[0];
    await UserService.updateKindeUser(kindeUser.id, next, USER_ROLES.CLIENT);
    const recordId = entityData.clientId;

    delete entityData.clientId;
    const rowId = db().update('client', entityData, { clientId: recordId });
    
    return db().queryFirstRow('SELECT * FROM client WHERE rowid=?', rowId);
  } catch (error) {
    next(error);
  }
}

const deleteClient = (clientId) => {
  let client = db().queryFirstRow('SELECT * FROM client WHERE clientId=?', clientId);
  if (!client) {
    throwError(404, `Client with client ID ${clientId} not found!`);
  }

  try {
    db().delete('client', { clientId });
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      throwError(409, e.message)
    }
    throwError(500, e.message)
  }
}


export {
  createClient, deleteClient, getClientByClientId, getClients, updateClient
};
