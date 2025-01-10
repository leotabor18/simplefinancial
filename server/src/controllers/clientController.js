import { throwError } from '../middleware/error.js';
import { BusinessService, ClientService } from '../services/index.js';
import { USER_ROLES } from '../util/constants.js';
import log from '../util/log.js';

class ClientController {
  getClients = async(req, res, next) => {
    const { query } = req;

    try {
      const size = parseInt(query.size) || 10;
      const page = parseInt(query.page) || 1;
      const sortField = query.sortField || 'lastName';
      const sortOrder = query.sortOrder === 'desc' ? 'DESC' : 'ASC';
      const search = query.search || '';

      const offset = (page - 1) * size;

      const params = {
        search,
        sortField,
        sortOrder,
        size,
        offset
      }
      const clients = await ClientService.getClients(params, next);
      res.json({ clients: clients });
    } catch (e) {
      next(e)
    }
  };

  getClientById =async(req, res, next) => {
    if (!req.params.userId) {
      throwError(400, 'Failed to get client. Missing client ID parameter');
    }

    const client = await ClientService.getClientByClientId(req.params.userId, USER_ROLES.CLIENT, next);
    res.json(client);
  };

  create = async (req, res, next) => {
    try {
      const { body } = req;
      if (!body.email) {
        throwError(400, 'Failed to create client. Email address is required!');
      }
  
      // TODO: add business checking here
      // const businessNames = BusinessService.getExistingBusinessName();
      // if (businessNames.length) {
      //   throwError(409, 'Failed to create client. Business names already exit!: ' + businessNames);
      // }
      
      const client = await ClientService.createClient(req, next);
      res.json(client);
    } catch(e) {
      next(e);
    }
  };

  update = async(req, res, next) => {
    try {
      if (!req.params.clientId) {
        throwError(400, 'Failed to update client. Missing client ID parameter');
      }
      // TODO: Add request body parameter validation
      const client = await ClientService.updateClient(req, next);
      res.json(client);
    } catch (e) {
      next(e)
    }
  };

  delete = async(req, res) => {
    if (!req.params.clientId) {
      throwError(400, 'Failed to delete client. Missing client ID parameter');
    }

    await ClientService.deleteClient(req.params.clientId);

    res.sendStatus(200);
  };
}


export default ClientController;