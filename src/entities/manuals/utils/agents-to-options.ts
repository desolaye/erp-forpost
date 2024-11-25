import { AgentType } from '../model/agent.schema'

export const agentsToOptions = (agents?: AgentType[]) => {
  if (!agents || !agents.length) return []
  return agents.map((v) => ({ label: v.name, value: v.id }))
}
