import { OperationType } from '../model/operation.schema'

export const operationsToOptions = (ops?: OperationType[]) => {
  if (!ops || !ops.length) return []
  return ops.map((v) => ({ label: v.name, value: v.id }))
}
