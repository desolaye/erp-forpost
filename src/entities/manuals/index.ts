export {
  type AgentType,
  ZAgent,
  type AgentValidatorType,
  ZAgentValidator,
  type AgentResponseType,
  ZAgentResponse,
} from './model/agent.schema'

export * from './services/agents'

export {
  type ProductType,
  ZProduct,
  type ProductValidatorType,
  ZProductValidator,
  type ProductResponseType,
  ZProductResponse,
} from './model/product.schema'

export * from './services/products'

export {
  type WarehouseType,
  ZWarehouse,
  type WarehouseValidatorType,
  ZWarehouseValidator,
  type WarehouseResponseType,
  ZWarehouseResponse,
} from './model/warehouse.schema'

export * from './services/warehouses'

export {
  type StaffType,
  ZStaff,
  type StaffResponseType,
  ZStaffResponse,
  type StaffValidatorType,
  ZStaffValidator,
} from './model/staff.manual'

export * from './services/staff'

export {
  type TechcardFullType,
  type TechcardType,
  ZTechcard,
  ZTechcardFull,
} from './model/techcard.schema'

export * from './services/techcards'

export { type RoleType, ZRole } from './model/role.schema'

export * from './services/roles'
