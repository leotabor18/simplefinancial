-- Up
CREATE TABLE client (
  clientId INTEGER PRIMARY KEY,
  userId TEXT NOT NULL UNIQUE,
  firstName TEXT,
  lastName TEXT,
  email TEXT  NOT NULL UNIQUE,
  phoneNumber TEXT,
  streetAddress TEXT,
  city TEXT,
  [state] TEXT,
  zip TEXT,
  country TEXT,
  type TEXT,
  status INTEGER,
  taxNumber INTEGER,
  whoAdded TEXT,
  whoUpdated TEXT,
  whenAdded INTEGER,
  ts INTEGER
);

CREATE TABLE [teamClient] (
  teamClientId INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  clientId INTEGER NOT NULL,
  FOREIGN KEY (clientId) REFERENCES client (clientId)
);

CREATE TABLE category (
  categoryId INTEGER PRIMARY KEY,
  [name] TEXT NOT NULL UNIQUE,
  [description] TEXT,
  whoAdded TEXT,
  whoUpdated TEXT,
  whenAdded INTEGER,
  ts INTEGER
);

CREATE TABLE clientCategory (
  clientCategoryId INTEGER PRIMARY KEY,
  clientId INTEGER NOT NULL,
  categoryId INTEGER NOT NULL,
  FOREIGN KEY (clientId) REFERENCES client (clientId),
  FOREIGN KEY (categoryId) REFERENCES category (categoryId)
);

CREATE TABLE business (
  businessId INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  email TEXT,
  phoneNumber TEXT,
  streetAddress TEXT,
  city TEXT,
  [state] TEXT,
  zip TEXT,
  country TEXT,
  type TEXT,
  status INTEGER,
  taxNumber INTEGER  NOT NULL,
  whoAdded TEXT,
  whoUpdated TEXT,
  whenAdded INTEGER,
  ts INTEGER
);

CREATE TABLE clientBusiness (
  clientBusinessId INTEGER PRIMARY KEY,
  clientId INTEGER NOT NULL,
  businessId INTEGER NOT NULL,
  FOREIGN KEY (clientId) REFERENCES client (clientId),
  FOREIGN KEY (businessId) REFERENCES business (businessId)
);

CREATE TABLE task (
  taskId INTEGER PRIMARY KEY,
  clientId INTEGER NOT NULL,
  businessId INTEGER,
  [name] TEXT NOT NULL,
  [instruction] TEXT NOT NULL,
  dateCompleted INTEGER,
  dueDate INTEGER,
  whoAdded TEXT,
  whoUpdated TEXT,
  whenAdded INTEGER,
  ts INTEGER,
  FOREIGN KEY (clientId) REFERENCES client (clientId)
);

CREATE TABLE [file] (
  fileId INTEGER PRIMARY KEY,
  taskId INTEGER NOT NULL,
  [name] TEXT NOT NULL,
  fileUrl TEXT NOT NULL,
  [description] TEXT,
  whoAdded TEXT,
  whoUpdated TEXT,
  whenAdded INTEGER,
  ts INTEGER,
  FOREIGN KEY (taskId) REFERENCES task (taskId)
);

CREATE TABLE form (
  formId INTEGER PRIMARY KEY,
  title TEXT,
  description TEXT,
  isResponseAllowed INTEGER,
  whoAdded TEXT,
  whoUpdated TEXT,
  whenAdded INTEGER,
  ts INTEGER
);

CREATE TABLE taskForm (
  taskFormId INTEGER PRIMARY KEY,
  taskId INTEGER NOT NULL,
  formId INTEGER NOT NULL,
  status INTEGER NOT NULL,
  dateCompleted INTEGER,
  progress INTEGER,
  FOREIGN KEY (taskId) REFERENCES task (taskId),
  FOREIGN KEY (formId) REFERENCES form (formId)
);

CREATE TABLE formItem (
  formItemId INTEGER PRIMARY KEY,
  formId INTEGER NOT NULL,
  type INTEGER NOT NULL,
  question TEXT,
  isRequired INTEGER,
  imageUrl TEXT,
  section TEXT,
  [order] INTEGER,
  description TEXT,
  FOREIGN KEY (formId) REFERENCES form (formId)
);

CREATE TABLE [option] (
  optionId INTEGER PRIMARY KEY,
  formItemId INTEGER NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (formItemId) REFERENCES formItem (formItemId)
);

CREATE TABLE submitted (
  submittedId INTEGER PRIMARY KEY,
  taskFormId INTEGER NOT NULL,
  formItemId INTEGER NOT NULL,
  [values] TEXT,
  FOREIGN KEY (taskFormId) REFERENCES taskForm (taskFormId)
);


-- Down
-- DROP TABLE IF EXISTS [user];
-- DROP TABLE IF EXISTS [client];
-- DROP TABLE IF EXISTS [task];
-- DROP TABLE IF EXISTS [file];
-- DROP TABLE IF EXISTS [category];
-- DROP TABLE IF EXISTS [clientCategory];