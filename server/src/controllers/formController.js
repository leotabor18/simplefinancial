import { throwError } from '../middleware/error.js';
import { FormService } from '../services/index.js';

class FormController {
  getForms = (req, res) => {
    const forms = FormService.getForms();
    res.json(forms);
  };

  getFormById = (req, res) => {
    if (!req.params.formId) {
      throwError(400, 'Failed to get form. Missing form ID parameter');
    }

    const form = FormService.getFormByFormId(req.params.formId);
    res.json(form);
  };

  create = async (req, res, next) => {
    const { body } = req;
    const { title } = body;
    try {
      if (!title) {
        throwError(400, 'Failed to create form. Title is required!');
      }
      const form = await FormService.createForm(req, next);
      res.json(form);
    } catch {
      next(e);
    }
  };

  update = (req, res) => {
    if (!req.params.formId) {
      throwError(400, 'Failed to update form. Missing form ID parameter');
    }
    // TODO: Add request body parameter validation
    const form = FormService.updateForm(req);
    res.json(form);
  };

  delete = (req, res) => {
    if (!req.params.formId) {
      throwError(400, 'Failed to delete form. Missing form ID parameter');
    }

    FormService.deleteForm(req.params.formId);

    res.sendStatus(200);
  };
}


export default FormController;