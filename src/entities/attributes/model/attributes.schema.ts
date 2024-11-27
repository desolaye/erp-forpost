import { z } from 'zod'

export const ZAttribute = z.object({
  id: z.string(),
  name: z.string(),
  values: z.array(z.string()),
})

export type AttributeType = z.infer<typeof ZAttribute>
