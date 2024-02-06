import { z } from 'zod'

export const taskInputSchema = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim().min(3),
  completed: z.boolean(),
})

export type TaskInput = z.infer<typeof taskInputSchema>
