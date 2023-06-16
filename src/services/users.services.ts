import format from 'pg-format';
import { client } from '../database';
import { User, UserCreate, UserResult, UserReturn } from '../interfaces';
import { hash } from 'bcryptjs';
import { userReturn } from '../schemas';

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

export default { create };
