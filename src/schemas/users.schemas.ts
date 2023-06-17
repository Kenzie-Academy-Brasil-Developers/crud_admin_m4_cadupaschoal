import z from "zod";

const user = z.object({
  id: z.number().positive(),
  name: z.string().max(50).nonempty(),
  email: z.string().email().max(50).nonempty(),
  password: z.string().max(120).nonempty(),
  admin: z.boolean().nullish(),
});

const userCreate = user.omit({ id: true });
const userReturn = user.omit({ password: true });

export { user, userCreate, userReturn };
