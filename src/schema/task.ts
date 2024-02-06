import { z } from 'zod'

export const taskInputSchema = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim().min(3),
  completed: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']),
})

export type TaskInput = z.infer<typeof taskInputSchema>
