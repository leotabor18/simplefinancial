import { lucia } from 'lucia';
import { node } from 'lucia/middleware';

export const auth = lucia({
  env: 'DEV', // "PROD" if deployed to HTTPS
  middleware: node(),
});
