import { throwError } from '../middleware/error.js';
import { createCategory, deleteCategory, getCategories, getCategoryByCategoryId, updateCategory } from '../services/categoryService.js';

class CategoryController {
  getCategories = (req, res, next) => {
    let result = []
    try {
      result = getCategories();
    } catch (e) {
      next(e);
    }
    res.json({ categories : result });
  };

  getCategoryById = (req, res) => {
    if (!req.params.categoryId) {
      throwError(400, 'Failed to get category. Missing category ID parameter');
    }

    const category = getCategoryByCategoryId(req.params.categoryId);
    res.json(category);
  };

  create = (req, res) => {
    // TODO: Add request body parameter validation
    const category = createCategory(req);

    res.json(category);
  };

  update = (req, res) => {
    if (!req.params.categoryId) {
      throwError(400, 'Failed to update category. Missing category ID parameter');
    }
    // TODO: Add request body parameter validation

    const category = updateCategory(req);
    res.json(category);
  };

  delete = (req, res) => {
    if (!req.params.categoryId) {
      throwError(400, 'Failed to delete category. Missing category ID parameter');
    }

    deleteCategory(req.params.categoryId);

    res.sendStatus(200);
  };
}


export default CategoryController;