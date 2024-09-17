import { z } from 'zod'

export const ZStep = z.object({
  id: z.string().uuid(),
  techCardId: z.string().uuid(),
  operationId: z.string().uuid(),

  description: z.string().nullable(),
  duration: z.string(),
  cost: z.number(),
  unitOfMeasure: z.number(),
})

export const ZStepValidator = z.object({
  description: z.string().nullable(),
  duration: z
    .string()
    .regex(
      /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/gi,
      'Формат длительности операции должен быть XX:XX:XX',
    ),
  cost: z.string().regex(/[0-9]+/gi),
  unitOfMeasure: z.string().regex(/[0-9]+/gi),
  number: z.string().regex(/[0-9]+/),

  operationId: z.object({
    value: z.string().uuid(),
    label: z.string(),
  }),
})

export type StepType = z.infer<typeof ZStep>
export type StepValidatorType = z.infer<typeof ZStepValidator>
