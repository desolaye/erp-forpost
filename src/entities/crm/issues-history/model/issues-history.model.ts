import { z } from 'zod'

import { isoToTime } from '@/shared/utils/iso-to-time'

const ZIssueHistory = z.object({
  productDevelopmentId: z.string().uuid(),
  issueId: z.string().uuid(),
  executorId: z.string().uuid(),
  responsibleId: z.string().uuid(),

  productName: z.string(),
  operationName: z.string(),
  serialNumber: z.string(),
  description: z.string().nullable(),
  executorName: z.string(),
  responsibleName: z.string(),
  completionDate: z.string(),
})

export const ZIssueHistoryResponse = z
  .object({
    issues: z.array(ZIssueHistory),
    totalCount: z.number(),
  })
  .transform((data) => ({
    ...data,
    issues: data.issues.map((v) => ({
      ...v,
      completionDate: isoToTime(v.completionDate),
    })),
  }))

export type IssueHistoryType = z.infer<typeof ZIssueHistory>
export type IssueHistoryResponseType = z.infer<typeof ZIssueHistoryResponse>
