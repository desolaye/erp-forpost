import { z } from 'zod'

export const ZAgent = z.object({
  id: z.string(),
  name: z.string(),
})

export const ZAgentValidator = z.object({
  name: z.string().min(3, 'Имя контрагента слишком короткое'),
})

export const ZAgentResponse = z.object({
  contractors: z.array(ZAgent),
  totalCount: z.number(),
})

export type AgentType = z.infer<typeof ZAgent>
export type AgentValidatorType = z.infer<typeof ZAgentValidator>
export type AgentResponseType = z.infer<typeof ZAgentResponse>
