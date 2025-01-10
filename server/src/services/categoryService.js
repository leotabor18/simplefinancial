import db from 'better-sqlite3-helper';
import moment from 'moment';
import { throwError } from '../middleware/error.js';
import Task from '../model/taskModel.js';
import Category from '../model/categoryModel.js';

// TODO: Add pagination
const getCategories = () => {
  return db().query('SELECT * FROM category');
}

const getCategoryByCategoryId = (categoryId) => {
  const category = db().queryFirstRow('SELECT * FROM category WHERE categoryId=?', categoryId);
  if (!category) {
    throwError(404, `Category with category ID ${categoryId} not found!`);
  }
  return category;
}

const createCategory = (req) => {
  const { body, user: userContext } = req;
  const { id } = userContext;

  const categoryData = new Category({
    ...body,
    whoAdded: id,
    whoUpdated: id,
    whenAdded: moment().unix(),
    ts: moment().unix(),
  });

  delete categoryData.categoryId;
  try {
    const rowId = db().insert('task', categoryData)
  
    return db().queryFirstRow('SELECT * FROM category WHERE rowid=?', rowId);
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      throwError(409, e.message)
    }
    throwError(500, e.message)
  }
}

const updateCategory = (req) => {
  const { body, user: userContext, params } = req;
  const { id } = userContext;
  const { categoryId } = params;

  try {
    let category = db().queryFirstRow('SELECT * FROM category WHERE categoryId=?', categoryId);
    if (!category) {
      throwError(404, `Category with category ID ${categoryId} not found!`);
    }
  
    const requestName = body.name;
    const categoryName = category.name;
  
    if (requestName !==  categoryName) {
      const isCategoryNameExist = db().queryFirstRow('SELECT * FROM category WHERE name=? AND categoryId !=?', requestName, category.categoryId);
      if (isCategoryNameExist) {
        throwError(409, `Category with name ${requestName} already exist!`);
      }
    }
    
    category = new Category({
      ...category,
      ...body,
      ts: moment().unix(),
      whoUpdated: id
    });
  
    delete category.categoryId;
    db().update('category', category, { categoryId })
  
    return db().queryFirstRow('SELECT * FROM category WHERE categoryId=?', categoryId);
  } catch(error) {
    let status = 500
    let message = error
    if (error.status) {
      status = error.status;
      message = error.message
    } 
    throwError(status, message);
  }
}

const deleteCategory = (categoryId) => {
  let category = db().queryFirstRow('SELECT * FROM category WHERE categoryId=?', categoryId);
  if (!category) {
    throwError(404, `Category with category ID ${categoryId} not found!`);
  }

  try {
    db().delete('category', { categoryId });
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      throwError(409, e.message)
    }
    throwError(500, e.message)
  }
}


export {
  getCategories, createCategory, deleteCategory, getCategoryByCategoryId, updateCategory
};
