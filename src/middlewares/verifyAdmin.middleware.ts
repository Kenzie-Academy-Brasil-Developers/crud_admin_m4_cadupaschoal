import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { AppError } from "../errors";

const verifyAdmin = async (req: Request,res: Response, next: NextFunction ): Promise<void> => {
    const email = res.locals.decoded.email;
    const query = await client.query(`SELECT * FROM users WHERE email = $1;`,[email])
    if(!query.rows[0].admin){
        throw new AppError("Insufficient permission",403);
    };

    next();
};

export default verifyAdmin;