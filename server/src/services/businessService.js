import db from 'better-sqlite3-helper';
import moment from 'moment';
import { throwError } from '../middleware/error.js';
import Task from '../model/taskModel.js';
import File from '../model/fileModel.js';
import Business from '../model/businessModel.js';
import ClientBusiness from '../model/clientBusinessModel.js';

// TODO: Add pagination
const getBusiness = () => {
  return db().query('SELECT * FROM business');
}

const getBusinessByBusinessId = (businessId) => {
  const file = db().queryFirstRow('SELECT * FROM business WHERE businessId=?', businessId);
  if (!file) {
    throwError(404, `Business with file ID ${businessId} not found!`);
  }
  return file;
}

const getBusinessClients = (businessId) => {
  const query = `
    SELECT firstName, lastName, clientId
    FROM client_business
    WHERE
      businessId = ?
    `
  let clients = db().query(query, businessId);
  return clients;
}

const getBusinessByName = (name) => {
  return db().queryFirstRow('SELECT * FROM business WHERE name=?', name);
}

const getExistingBusinessName = (businessNames) => {
  const query = `
    SELECT * FROM business
    WHERE name IN (${businessNames.map(() => '?').join(',')})
  `
  const businesses = db().query(query, businessNames)
  console.log('businesses ', businesses);

  return businesses.map(business => business.name);
}

const createClientBusiness = (req) => {
  const { clientId, businessId } = req;

  const clientBusinessData = new ClientBusiness({
    clientId,
    businessId
  });

  db().insert('clientBusiness', clientBusinessData);
}

const createBusiness = (req) => {
  const { body, user: userContext } = req;
  const { id } = userContext;

  // TODO: Add client id
  const businessData = new Business({
    ...body,
    whoAdded: id,
    whoUpdated: id,
    whenAdded: moment().unix(),
    ts: moment().unix(),
  });

  delete businessData.businessId;
  try {
    const rowId = db().insert('business', businessData)
  
    return db().queryFirstRow('SELECT * FROM business WHERE rowid=?', rowId);
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      throwError(409, e.message)
    }
    throwError(500, e.message)
  }
}

const updateBusiness = (req) => {
  const { body, user: userContext, params } = req;
  const { id } = userContext;
  const { businessId } = params;

  try {
    let business = db().queryFirstRow('SELECT * FROM business WHERE businessId=?', businessId);
    if (!business) {
      throwError(404, `Business with business ID ${businessId} not found!`);
    }
    
    business = new Business({
      ...business,
      ...body,
      ts: moment().unix(),
      whoUpdated: id
    });
  
    delete business.businessId;
    db().update('business', business, { businessId })
  
    return db().queryFirstRow('SELECT * FROM business WHERE businessId=?', businessId);
  } catch (error) {
    let status = 500
    let message = error
    if (error.status) {
      status = error.status;
      message = error.message
    } 
    throwError(status, message);
  }
}

const deleteBusiness = (businessId) => {
  let business = db().queryFirstRow('SELECT * FROM business WHERE businessId=?', businessId);
  if (!business) {
    throwError(404, `Business with business ID ${businessId} not found!`);
  }

  try {
    db().delete('business', { businessId });
  } catch (e) {
    throwError(500, e.message)
  }
}


export {
  getBusiness,
  createBusiness,
  deleteBusiness,
  getBusinessByBusinessId,
  updateBusiness,
  getBusinessByName,
  getExistingBusinessName,
  createClientBusiness,
  getBusinessClients
};
