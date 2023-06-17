import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { AppError } from "../errors";

const validateParams = async (req: Request,res: Response, next: NextFunction ): Promise<void> => {
    const {courseId, userId} = req.params;

    const queryUser = await client.query(`SELECT * FROM "users" WHERE id = $1;`,[userId]);
    const queryCourse = await client.query(`SELECT * FROM "courses" WHERE id = $1;`,[courseId]);

    if(queryUser.rowCount === 0 || queryCourse.rowCount === 0){
        throw new AppError("User/course not found", 404);
    };
    
    next();
};

export default validateParams;