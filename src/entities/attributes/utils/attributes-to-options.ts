import { AttributeType } from '../model/attributes.schema'

export const attributesToOptions = (attrs?: AttributeType[]) => {
  if (!attrs) return []

  return attrs.map((v) => ({
    id: v.id,
    name: v.name,
    options: v.values.map((opt) => ({ label: opt, value: opt })),
  }))
}
