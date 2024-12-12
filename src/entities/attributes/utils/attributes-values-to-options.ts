import { AttributeType } from '../model/attributes.schema'

export const attributesValuesToOptions = (id: string, attrs?: AttributeType[]) => {
  if (!attrs) return []
  return attrs.find((k) => k.id === id)?.values.map((z) => ({ label: z, value: z })) || []
}
