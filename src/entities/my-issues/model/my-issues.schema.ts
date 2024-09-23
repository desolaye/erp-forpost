import { z } from 'zod'

import { isoToTime } from '@/shared/utils/iso-to-time'

export const ZMyIssue = z.object({
  id: z.string().uuid(),
  executorId: z.string().uuid(),
  responsibleId: z.string().uuid(),

  executorName: z.string().nullable(),
  responsibleName: z.string().nullable(),

  description: z.string(),
  operationName: z.string(),
  productName: z.string(),

  issueNumber: z.number(),
  currentQuantity: z.number(),
  productCompositionFlag: z.boolean(),

  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
})

export const ZMyIssueResponse = z
  .object({
    issues: z.array(ZMyIssue),
    totalCount: z.number(),
  })
  .transform((data) => ({
    totalCount: data.totalCount,
    issues: data.issues.map((v) => ({
      ...v,
      startTime: isoToTime(v.startTime, true),
      endTime: isoToTime(v.endTime, true),
    })),
  }))

export const ZIssueExecutorValidator = z.object({
  executorId: z.object({
    value: z.string().uuid(),
    label: z.string(),
  }),
})

export type MyIssueType = z.infer<typeof ZMyIssue>
export type MyIssueResponseType = z.infer<typeof ZMyIssueResponse>
export type IssueExecutorValidatorType = z.infer<typeof ZIssueExecutorValidator>
