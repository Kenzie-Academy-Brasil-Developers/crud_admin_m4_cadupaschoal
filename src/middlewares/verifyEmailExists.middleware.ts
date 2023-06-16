import { Request, Response, NextFunction } from 'express';
import { UserResult } from '../interfaces';
import { client } from '../database';
import { AppError } from '../errors';
const verifyEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const queryString = ' SELECT * FROM "users" WHERE email = $1;';
  const query: UserResult = await client.query(queryString, [email]);
  console.log(query.rowCount, 'count');
  if (query.rowCount !== 0) {
    throw new AppError('Email already registered', 409);
  }

  return next();
};

export default verifyEmailExists;
