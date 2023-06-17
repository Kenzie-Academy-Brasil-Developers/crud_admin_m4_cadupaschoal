import format from "pg-format";
import { client } from "../database";
import { Courses, CourseCreate, CourseResult } from "../interfaces";

const create = async (payload: CourseCreate): Promise<Courses> => {
  const queryFormat = format(
    `INSERT INTO courses (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: CourseResult = await client.query(queryFormat);
  return queryResult.rows[0];
};

const retrieve = async (): Promise<Courses[]> => {
    const query = await client.query(`SELECT *FROM "courses";`);
    return query.rows;
};

const addUserOnCourse = async (courseId:string, userId: string): Promise<object> => {
    const queryString = 
    `INSERT INTO "userCourses" ("courseId","userId") VALUES ($1,$2) RETURNING *;`
    await client.query(queryString,[courseId,userId]);
    return {message: "User successfully vinculed to course"};
   
};

const deleteUserFromCourse = async (courseId:string, userId: string): Promise<void> => {
  const queryString: string = `
    UPDATE "userCourses"
    SET active = false
    WHERE "courseId" = $1
    AND "userId" = $2;
  `
  await client.query(queryString,[courseId,userId]);
  
  return;
};

const retrieveUsersOnCourse = async (courseId:string): Promise<void> => {
  const queryString: string = `
  SELECT
  uc."userId",
  u."name" "userName",
  c."id" "courseId",
  c."name" "courseName",
  c."description" "courseDescription",
  uc."active" "userActiveInCourse"
  FROM "userCourses" uc
    JOIN users u
  ON uc."userId" = u.id
    JOIN courses c
  ON c.id = uc."courseId"
    WHERE "courseId" = $1;
  `;
  const queryResult: any = await client.query(queryString,[courseId]);

  return queryResult.rows;
  
};

export default {create, retrieve, addUserOnCourse, deleteUserFromCourse, retrieveUsersOnCourse};