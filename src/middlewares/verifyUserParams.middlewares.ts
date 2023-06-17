import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { AppError } from "../errors";

const verifyUserParams = async (req: Request,res: Response, next: NextFunction ): Promise<void> => {
    const {id} = req.params;

    const queryCourse = await client.query(`SELECT * FROM "userCourses" WHERE "userId" = $1;`,[id]);
    if(queryCourse.rowCount === 0){
        throw new AppError("No course found", 404);
    };
    
    next();
};

export default verifyUserParams;