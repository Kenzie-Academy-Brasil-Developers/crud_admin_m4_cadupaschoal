import { sign } from "jsonwebtoken";
import { AppError } from "../errors";
import { LoginRequest } from "../interfaces";
import { UserResult } from "../interfaces";
import { client } from "../database";
import { compare } from "bcryptjs";

const loginService = async (payload: LoginRequest):Promise<string> => {
    const queryString = `SELECT * FROM  "users" 
                            WHERE "email" = $1;`;
    const queryResult:UserResult = await client.query(queryString,[payload.email]);

    if(queryResult.rowCount === 0){
        throw new AppError("Wrong email/password.",401);
    };

    const comparePassword: boolean = await compare(
     payload.password,
     queryResult.rows[0].password   
    );

    if(!comparePassword){
        throw new AppError("Wrong email/password",401);
    }

    const token: string = sign(
        {
            email: queryResult.rows[0].email,
        },
        process.env.SECRET_KEY!,
        {
            expiresIn:process.env.EXPIRES_IN,
            subject: queryResult.rows[0].id.toString()
        }
    );
    return token;
};

export default loginService;