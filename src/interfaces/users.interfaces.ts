import z from 'zod';
import { QueryResult } from 'pg';
import { user, userCreate, userReturn } from '../schemas';

type User = z.infer<typeof user>;
type UserCreate = z.infer<typeof userCreate>;
type UserReturn = z.infer<typeof userReturn>;

type UserResult = QueryResult<User>;

export { User, UserCreate, UserResult, UserReturn };
