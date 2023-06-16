import { Request, Response } from 'express';
import { User } from '../interfaces';
import { usersServices } from '../services';
import { userReturn } from '../schemas';

const create = async (req: Request, res: Response): Promise<Response> => {
  console.log(req.body);
  const user = await usersServices.create(req.body);
  return res.status(201).json(user);
};

export default { create };
