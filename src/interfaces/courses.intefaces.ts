import { QueryResult } from "pg";
import {course,courseCreate} from "../schemas";
import z from "zod";

type Courses = z.infer<typeof course>;
type CourseCreate = z.infer<typeof courseCreate>;
type CourseResult = QueryResult<Courses>;

export { Courses, CourseCreate, CourseResult};