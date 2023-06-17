import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import z from "zod";

const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message });
  };

  if (err instanceof z.ZodError) {
    return res.status(400).json(err.flatten().fieldErrors);
  };

  console.error(err);
  return res.status(500).json({ message: 'Internal server error.' });
};

export default handleErrors;
