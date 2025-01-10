import { throwError } from '../middleware/error.js';
import { UserService } from '../services/index.js';
import { USER_ROLES } from '../util/constants.js';

class UserController {
  getUsers = async(req, res, next) => {
    const { query } = req;

    try {
      const size = parseInt(query.size) || 10;
      const page = parseInt(query.page) || 1;
      const sortField = query.sortField || 'lastName';
      const sortOrder = query.sortOrder === 'desc' ? 'DESC' : 'ASC';
      const search = query.search || '';
      
      const offset = (page - 1) * size;
      const validSortField = ['lastName', 'email'];
      if (!validSortField.includes(sortField)) {
        throwError(400, 'Failed to get users. Invalid sort field parameter');
      }
  
      const params = {
        search,
        sortField,
        sortOrder,
        size,
        offset
      }
  
      const users = await UserService.getUsers(params, next);
      res.json({ users });
    } catch (e) {
      next(e);
    }    
  };

  getManagementUsers = async(req, res, next) => {
    try {
      const users = await UserService.getManagementUsers(next);
      res.json({ users });
    } catch(e) {
      next(e);
    }
  }

  getUserById = async(req, res, next) => {
    if (!req.params.userId) {
      throwError(400, 'Failed to get user. Missing user ID parameter');
    }

    const user = await UserService.getUserByUserId(req.params.userId, USER_ROLES.MANAGEMENT,next);
    res.json(user);
  };

  create = async(req, res, next) => {
    if (!req.body.email) {
      throwError(400, 'Failed to create user. Email address is required!');
    }
    // TODO: Add request body parameter validation
    const user = await UserService.createUser(req, next);

    res.json(user);
  };

  update = async(req, res, next) => {
    if (!req.params.userId) {
      throwError(400, 'Failed to update user. Missing user ID parameter');
    }
    // TODO: Add request body parameter validation
    const user = await UserService.updateUser(req, next);
    res.json(user);
  };

  delete = async(req, res) => {
    if (!req.params.userId) {
      throwError(400, 'Failed to delete user. Missing user ID parameter');
    }

    await UserService.deleteUser(req.params.userId);

    res.sendStatus(200);
  };
}


export default UserController;