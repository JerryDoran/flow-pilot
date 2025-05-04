import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Project name is required' }).max(50, {
    message: 'Project name must be less than 50 characters',
  }),
  description: z
    .string()
    .min(1, { message: 'Project description is required' })
    .max(200, {
      message: 'Project description must be less than 200 characters',
    })
    .optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

export default formSchema;
