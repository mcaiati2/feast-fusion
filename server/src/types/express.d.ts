import { User } from '../../models/index.js';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}