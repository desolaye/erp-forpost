import { AgentType } from '../model/agent.schema'

export const agentsToOptions = (agents?: AgentType[]) => {
  return !agents ? [] : agents.map((v) => ({ label: v.name, value: v.id }))
}
