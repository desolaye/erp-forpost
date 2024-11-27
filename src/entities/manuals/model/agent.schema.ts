import { z } from 'zod'

export const ZAgent = z.object({
  id: z.string().uuid(),
  name: z.string(),
  inn: z.string(),
  country: z.string(),
  city: z.string(),

  description: z.string(),
  logisticInfo: z.string(),

  discountLevel: z.number(),

  contractorType: z.object({
    value: z.number(),
    name: z.string(),
  }),
})

export const ZAgentRepresentatives = z.object({
  id: z.string(),
  contractorId: z.string().uuid(),
  name: z.string(),
  post: z.string(),
  description: z.string(),
})

export const ZAgentValidator = z.object({
  name: z.string().min(3, 'Имя контрагента слишком короткое'),
  inn: z.string().regex(/^[0-9]{3,16}$/gi, 'Неверный формат ИНН. От 3 до 16 цифр'),

  country: z.object({
    label: z.string(),
    value: z.string(),
  }),

  city: z.string(),

  description: z.string(),
  logisticInfo: z.string(),

  discountLevel: z.number(),

  contractorType: z.object({
    value: z.number(),
    label: z.string(),
  }),
})

export const ZAgentRepresentativesValidator = z.object({
  id: z.string(),
  contractorId: z.string().uuid(),
  name: z.string().min(3, 'Имя контрагента слишком короткое'),
  post: z.string(),
  description: z.string(),
})

export const ZAgentResponse = z.object({
  items: z.array(ZAgent),
  totalCount: z.number(),
})

export type AgentType = z.infer<typeof ZAgent>
export type AgentRepresentativesType = z.infer<typeof ZAgentRepresentatives>

export type AgentValidatorType = z.infer<typeof ZAgentValidator>
export type AgentRepresentativesValidatorType = z.infer<
  typeof ZAgentRepresentativesValidator
>

export type AgentResponseType = z.infer<typeof ZAgentResponse>
