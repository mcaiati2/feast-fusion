import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import dotenv from 'dotenv';

import { User } from '../../models/index.js';

dotenv.config();

const {sign, verify} = jsonwebtoken;

export function verifyToken(token: string) {
  try {
    const data = verify(token, process.env.JWT_SECRET!);

    return data;
  } catch (error) {
    console.log('VERIFY TOKEN ERROR - JWT', error);
    return false;
  }
}

export function createToken(user_id: number) {
  try {
    const token = sign({ user_id: user_id }, process.env.JWT_SECRET!);

    return token;
  } catch (error) {
    console.log('CREATE TOKEN ERROR - JWT');
    throw error;
  }
}

export const isAuthenticated: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({
      message: 'You are not authorized to perform that action'
    });
    return;
  }

  const userData = verifyToken(token);

  if (userData && typeof userData !== 'string') {
    const { user_id } = userData as { user_id: number };
    const user = await User.findByPk(user_id);
    req.user = user;

    next();
  } else {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
};