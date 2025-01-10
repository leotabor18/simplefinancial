import { throwError } from '../middleware/error.js';
import { createFile, deleteFile, getFileByFileId, getFiles, updateFile } from '../services/fileService.js';
import { BusinessService } from '../services/index.js';

class BusinessController {
  getBusinesses = (req, res) => {
    const businesses = BusinessService.getBusiness();
    res.json({ businesses });
  };

  getBusinessById = (req, res) => {
    if (!req.params.businessId) {
      throwError(400, 'Failed to get business. Missing business ID parameter');
    }

    const file = BusinessService.getBusinessByBusinessId(req.params.businessId);
    res.json(file);
  };

  create = (req, res) => {
    // TODO: Add request body parameter validation
    const business = BusinessService.createBusiness(req);

    res.json(business);
  };

  getBusinessClients = (req, res) => {
    if (!req.params.businessId) {
      throwError(400, 'Failed to get business clients. Missing business ID parameter');
    }
    const businessClients = BusinessService.getBusinessClients(req.params.businessId);
    res.json(businessClients);
  }

  update = (req, res) => {
    if (!req.params.businessId) {
      throwError(400, 'Failed to update business. Missing business ID parameter');
    }
    // TODO: Add request body parameter validation
    const business = BusinessService.updateBusiness(req);
    res.json(business);
  };

  delete = (req, res) => {
    if (!req.params.businessId) {
      throwError(400, 'Failed to delete business. Missing business ID parameter');
    }

    BusinessService.deleteBusiness(req.params.businessId);

    res.json({});
  };
}


export default BusinessController;