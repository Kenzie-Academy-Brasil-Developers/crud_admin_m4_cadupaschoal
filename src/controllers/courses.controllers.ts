import { Request, Response } from "express";
import { coursesServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const course = await coursesServices.create(req.body);
  return res.status(201).json(course);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
    const course = await coursesServices.retrieve();
    return res.status(200).json(course);
};

const addUserOnCourse = async (req: Request, res: Response): Promise<Response> => {
  const {courseId, userId} = req.params;
  const userCourse = await coursesServices.addUserOnCourse(courseId,userId);
    return res.status(201).json(userCourse);
};

const deleteUserFromCourse = async (req: Request, res: Response): Promise<Response> => {
  const {courseId, userId} = req.params;
  await coursesServices.deleteUserFromCourse(courseId,userId);
    return res.status(204).send();
};

const retrieveUsersOnCourse = async (req: Request, res: Response): Promise<Response> => {
  const {id} = req.params;
  const users = await coursesServices.retrieveUsersOnCourse(id);
    return res.status(200).json(users);
};

export default { create, retrieve, addUserOnCourse, deleteUserFromCourse, retrieveUsersOnCourse };