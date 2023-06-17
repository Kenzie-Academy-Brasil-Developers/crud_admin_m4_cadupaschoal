import { Router } from "express";
import middlewares from "../middlewares";
import { loginController} from "../controllers";
import { login } from "../schemas";

const loginRouter = Router();

loginRouter.post(
  "",
  middlewares.validateBody(login),
  middlewares.verifyEmailExists,
  loginController
);

export default loginRouter;