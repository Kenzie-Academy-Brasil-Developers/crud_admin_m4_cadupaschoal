import format from "pg-format";
import { client } from "../database";
import { UserCreate, UserResult, UserReturn, UserCourses } from "../interfaces";
import { hash } from "bcryptjs";
import { userReturn } from "../schemas";

const create = async (payload: UserCreate): Promise<UserReturn> => {
  payload.password = await hash(payload.password, 10);

  const queryFormat = format(
    `INSERT INTO users (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: UserResult = await client.query(queryFormat);
  return userReturn.parse(queryResult.rows[0]);
};

const retrieve = async (): Promise<UserReturn[]> => {
  const query = await client.query(`SELECT id, name, email, admin
  FROM "users";`);
  return query.rows;
};

const retrieveUserCourses = async (userId:string): Promise<UserCourses[]> => {
  const queryString: string = `
  SELECT 
  c.id "courseId",
  c.name "courseName",
  c.description "courseDescription",
  uc.active "userActiveInCourse",
  u.id "userId",
  u.name "userName"
  FROM "userCourses" uc
  JOIN courses c
  ON uc."courseId" = c."id"
  JOIN users u
  ON u.id = uc."userId"
  WHERE "userId" = $1;
  `;
  const queryResult: any = await client.query(queryString,[userId]);

  return queryResult.rows;
  
};


export default { create, retrieve, retrieveUserCourses };
