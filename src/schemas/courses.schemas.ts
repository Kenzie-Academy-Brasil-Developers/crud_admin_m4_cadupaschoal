import z from "zod";

const course = z.object({
    id: z.number().positive(),
    name: z.string().max(15).nonempty(),
    description:z.string().nonempty(),
});

const courseCreate = course.omit({id: true});

export { course, courseCreate };