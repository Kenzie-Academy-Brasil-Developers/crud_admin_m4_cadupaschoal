import { Router } from 'express';
import middlewares from '../middlewares';
import { usersControllers } from '../controllers';
import validateBody from '../middlewares/validateBody.middleware';
import { userCreate } from '../schemas';

const usersRouter = Router();

usersRouter.post(
  '',
  validateBody(userCreate),
  middlewares.verifyEmailExists,
  usersControllers.create
);

export default usersRouter;
