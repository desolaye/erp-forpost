import { isoToTime } from '@/shared/utils/iso-to-time'
import { z } from 'zod'

export const ZIssue = z.object({
  stepId: z.string().uuid(),
  responsibleId: z.string().uuid(),
  description: z.string(),
  productCompositionSettingFlag: z.boolean(),
})

export const ZIssueInProcess = z
  .object({
    id: z.string().uuid(),
    executorId: z.string().uuid(),
    responsibleId: z.string().uuid(),
    description: z.string(),
    operationName: z.string(),
    status: z.number(),
    issueNumber: z.number(),
    currentQuantity: z.number(),
    productCompositionFlag: z.boolean(),
    startTime: z.string().nullable(),
    endTime: z.string().nullable(),
  })
  .transform((data) => ({
    ...data,
    startTime: isoToTime(data.startTime, true),
    endTime: isoToTime(data.endTime, true),
  }))

export const ZIssueValidator = z.object({
  description: z.string(),
  // productCompositionSettingFlag: z.boolean(),

  stepId: z.object({
    value: z.string().uuid(),
    label: z.string(),
  }),
  responsibleId: z.object({
    value: z.string().uuid(),
    label: z.string(),
  }),
})

export type IssueType = z.infer<typeof ZIssue>
export type IssueInProcessType = z.infer<typeof ZIssueInProcess>
export type IssueValidatorType = z.infer<typeof ZIssueValidator>
