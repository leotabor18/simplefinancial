import Database from 'better-sqlite3';

export default new Database('simplefinancials.db' , { verbose: console.log });