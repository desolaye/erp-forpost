import { z } from 'zod'

import { isoToTime } from '@/shared/utils/iso-to-time'
import { ZIssueValidator } from './issues.schema'
import { statusToText } from '@/shared/utils/status-to-text'

export const ZProcess = z
  .object({
    id: z.string().uuid(),
    productId: z.string().uuid(),
    techCardId: z.string().uuid(),

    productName: z.string(),
    techCardNumber: z.string(),
    batchNumber: z.string(),

    currentQuantity: z.number(),
    targetQuantity: z.number(),

    startTime: z.string().nullable(),
    endTime: z.string().nullable(),
    status: z.number(),
  })
  .transform((data) => ({
    ...data,
    status: statusToText(data.status),
  }))

export const ZProcessValidator = z.object({
  batchNumber: z.string(),
  targetQuantity: z.string().regex(/[0-9]+/gi),
  startTime: z.string(),
  issues: z.array(ZIssueValidator),

  technologicalCardId: z.object({
    value: z.string().uuid(),
    label: z.string(),
  }),
})

export const ZProcessResponse = z
  .object({
    manufacturingProcesses: z.array(ZProcess),
    totalCount: z.number(),
  })
  .transform((data) => ({
    ...data,
    manufacturingProcesses: data.manufacturingProcesses.map((v) => ({
      ...v,
      startTime: isoToTime(v.startTime, true),
      endTime: isoToTime(v.endTime, true),
    })),
  }))

export type ProcessType = z.infer<typeof ZProcess>
export type ProcessValidatorType = z.infer<typeof ZProcessValidator>
export type ProcessResponseType = z.infer<typeof ZProcessResponse>
