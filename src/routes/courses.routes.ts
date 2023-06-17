import { Router } from "express";
import middlewares from "../middlewares";
import { coursesControllers } from "../controllers";
import { courseCreate } from "../schemas";

const coursesRouter = Router();

coursesRouter.post(
  "",
  middlewares.validateBody(courseCreate),
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  middlewares.verifyCourseExists,
  coursesControllers.create
);
coursesRouter.get('',coursesControllers.retrieve);
coursesRouter.post(
  "/:courseId/users/:userId",
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  middlewares.validateParams,
  coursesControllers.addUserOnCourse);
coursesRouter.delete(
  "/:courseId/users/:userId",
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  middlewares.validateParams,
  coursesControllers.deleteUserFromCourse);
coursesRouter.get(
  "/:id/users",
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  middlewares.validateCourseParams,
  coursesControllers.retrieveUsersOnCourse);
export default coursesRouter;