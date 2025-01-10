import db from 'better-sqlite3-helper';
import moment from 'moment';
import { throwError } from '../middleware/error.js';
import Form from '../model/formModel.js';
import FormItem from '../model/formItemModel.js';

const dbQuery = (query, ...params) => db().query(query, ...params);
const dbQueryFirstRow = (query, ...params) => db().queryFirstRow(query, ...params);

const getFormItemByFormId = (formId) => {
  const formItems = dbQuery('SELECT * FROM formItem WHERE formId = ?', formId);
  return formItems.map((item) => {
    const options = dbQuery('SELECT * FROM option WHERE formItemId = ?', item.formItemId).map(option => ({
      id: option.optionId,
      formItemId: item.formItemId,
      name: option.name,
    }));

    return {
      order: item.order,
      formId: item.formId,
      section: item.section,
      type: item.type,
      question: item.question,
      isRequired: item.isRequired,
      options,
    };
  });
};

const getFormByFormId = (formId) => {
  const form = dbQueryFirstRow('SELECT * FROM form WHERE formId = ?', formId);
  if (!form) {
    throwError(404, `Form with form ID ${formId} not found!`);
  }

  const formItems = getFormItemByFormId(formId);
  return {
    ...form,
    formItems,
  };
};

const getForms = () => {
  const forms = dbQuery('SELECT * FROM form');
  return {
    forms: forms.map((form) => {
      const formItems = getFormItemByFormId(form.formId);
      return {
        ...form,
        formItems,
      };
    }),
  };
};


const createForm = async (req, next) => {
  const { body, user: userContext } = req;
  const { id: userId } = userContext;
  const { formItems = [], ...formBody } = body;

  const timestamp = moment().unix();
  const formData = new Form({
    ...formBody,
    whoAdded: userId,
    whoUpdated: userId,
    whenAdded: timestamp,
    ts: timestamp,
  });

  delete formData.formId;

  try {
    const rowId = db().insert('form', formData);
    const createdForm = db().queryFirstRow('SELECT * FROM form WHERE rowid=?', rowId);

    if (!createdForm) {
      throwError(500, "Failed to create form.");
    }

    const { formId } = createdForm;

    if (Array.isArray(formItems) && formItems.length > 0) {
      for (const formItem of formItems) {
        const { options = [], ...formItemBody } = formItem;

        const formItemData = new FormItem({
          ...formItemBody,
          formId,
        });

        delete formItemData.formItemId;

        try {
          const formItemRowId = db().insert('formItem', formItemData);
          const createdFormItem = db().queryFirstRow('SELECT * FROM formItem WHERE rowid=?', formItemRowId);

          if (!createdFormItem) {
            throwError(500, "Failed to create form item.");
          }

          const { formItemId } = createdFormItem;

          if (Array.isArray(options) && options.length > 0) {
            for (const option of options) {
              if (!option.name) continue;

              const optionData = {
                name: option.name,
                formItemId,
              };

              db().insert('option', optionData);
            }
          }
        } catch (error) {
          next(error)
        }
      }
    }
    console.log('Form has been successfully created');
    return createdForm;
  } catch (error) {
    next(error)
  }
};  

const updateForm = (req) => {
  const { body, user: userContext, params } = req;
  const { id } = userContext;
  const { formId } = params;

  try {
    let form = db().queryFirstRow('SELECT * FROM form WHERE formId=?', formId);
    if (!form) {
      throwError(404, `Form with form ID ${formId} not found!`);
    }
    
    form = new Form({
      ...form,
      ...body,
      ts: moment().unix(),
      whoUpdated: id
    });
  
    delete form.formId;
    db().update('form', form, { formId })
  
    return db().queryFirstRow('SELECT * FROM form WHERE formId=?', formId);
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

const deleteForm = (formId) => {
  let form = db().queryFirstRow('SELECT * FROM form WHERE formId=?', formId);
  if (!form) {
    throwError(404, `Form with Form ID ${formId} not found!`);
  }

  try {
    db().delete('form', { formId });
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      throwError(409, e.message)
    }
    throwError(500, e.message)
  }
}


export { createForm, deleteForm, getFormByFormId, getForms, updateForm };

