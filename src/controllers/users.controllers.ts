import { Request, Response } from "express";
import { UserReturn, UserCourses } from "../interfaces";
import { usersServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await usersServices.create(req.body);
  return res.status(201).json(user);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const user:UserReturn[]   = await usersServices.retrieve();
  return res.status(200).json(user);
};

const retrieveUserCourses = async (req: Request, res: Response): Promise<Response> => {
  const {id} = req.params;
  const courses: UserCourses[] = await usersServices.retrieveUserCourses(id);
    return res.status(200).json(courses);
};
export default { create, retrieve, retrieveUserCourses };
