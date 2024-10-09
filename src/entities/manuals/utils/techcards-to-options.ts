import { TechcardType } from '../model/techcard.schema'

export const techcardsToOptions = (cards?: TechcardType[]) => {
  if (!cards) return []

  return cards.map((v) => ({
    label: `${v.number} - ${v.productName}`,
    value: v.id,
  }))
}
