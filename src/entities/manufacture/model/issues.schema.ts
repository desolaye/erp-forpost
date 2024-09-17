import { z } from 'zod'

export const ZIssue = z.object({
  stepId: z.string().uuid(),
  responsibleId: z.string().uuid(),
  description: z.string(),
  productCompositionSettingFlag: z.boolean(),
})

export const ZIssueValidator = z.object({
  description: z.string(),
  productCompositionSettingFlag: z.boolean(),

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
export type IssueValidatorType = z.infer<typeof ZIssueValidator>
