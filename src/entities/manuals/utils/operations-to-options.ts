import { OperationType } from '../model/operation.schema'

export const operationsToOptions = (operations?: OperationType[]) => {
  if (!operations) return []
  return operations.map((v) => ({ label: v.name, value: v.id }))
}
