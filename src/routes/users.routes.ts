import { Router } from "express";
import middlewares from "../middlewares";
import { usersControllers } from "../controllers";
import { userCreate } from "../schemas";

const usersRouter = Router();

usersRouter.post(
  "",
  middlewares.validateBody(userCreate),
  middlewares.verifyEmailExists,
  usersControllers.create
);

usersRouter.get(
  "",
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  usersControllers.retrieve
);

usersRouter.get(
  "/:id/courses",
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  middlewares.validateCourseParams,
  middlewares.verifyUserParams,
  usersControllers.retrieveUserCourses
  );

export default usersRouter;
