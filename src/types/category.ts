import { z } from 'zod'

export const CategorySchema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  name: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  anniversariesCount: z.number().optional(),
})

export type Category = z.infer<typeof CategorySchema>
