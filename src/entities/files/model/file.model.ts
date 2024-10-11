import { z } from 'zod'

const ZFile = z.object({
  id: z.string().uuid(),
  parentId: z.string().uuid(),

  contentType: z.string(),
  filePath: z.string(),
  fileName: z.string(),
})

export type FileType = z.infer<typeof ZFile>
