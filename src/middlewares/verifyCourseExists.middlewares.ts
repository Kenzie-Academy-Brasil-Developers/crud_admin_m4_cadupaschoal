import { Request, Response, NextFunction } from "express";
import { CourseResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";
const verifyCourseExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;
  const queryString = ' SELECT * FROM "courses" WHERE name = $1;';
  const query: CourseResult = await client.query(queryString, [name]);
  if (query.rowCount !== 0) {
    throw new AppError('Course already registered', 409);
  }

  return next();
};

export default verifyCourseExists;
