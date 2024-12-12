import { AttributeType } from '../model/attributes.schema'

export const attributesToOptions = (attrs?: AttributeType[]) => {
  if (!attrs) return []
  return attrs.map((v) => ({ label: v.name, value: v.id }))
}
