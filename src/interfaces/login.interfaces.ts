import z from "zod";
import { login } from "../schemas";

type LoginRequest = z.infer<typeof login>;

export { login ,LoginRequest };