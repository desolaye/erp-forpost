export {
  type AgentType,
  ZAgent,
  type AgentValidatorType,
  ZAgentValidator,
} from './model/agent.schema'

export { getAgentsManual } from './services/get-agents-manual'
export { postCreateAgent } from './services/post-create-agent'
export { getAgentByid } from './services/get-agent-by-id'

export {
  type ProductType,
  ZProduct,
  type ProductValidatorType,
  ZProductValidator,
} from './model/product.schema'

export * from './services/products'
