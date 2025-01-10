import { getUser, protectRoute } from '@kinde-oss/kinde-node-express';
import db from 'better-sqlite3-helper';
import cors from 'cors';
import express from 'express';
import { authSetup, handleAuth } from './src/middleware/auth.js';
import { handleError } from './src/middleware/error.js';
import routes from './src/routes/index.js';
import { init } from '@kinde/management-api-js';
const app = express();
const PORT = 8080;
import session from 'express-session';
// Initialize Kinde Auth Client Session
authSetup(app);

// Initialize Kinde Auth Management API
init();

const MemoryStore = require('memorystore')(session)

app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: false,
  secret: 'keyboard cat'
}))

app.use(cors());

app.use(express.json());

app.use(handleAuth);

app.use('/api', protectRoute, getUser, routes);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

db({
  path: './data/simplefinancials.db',
  readonly: false,
  fileMustExist: false,
  WAL: true, 
  migrate: { 
    force: false,
    table: 'migration',
    migrationsPath: './migrations'
  }
}).connection();