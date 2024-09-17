import { TechcardType } from '../model/techcard.schema'

export const techcardsToOptions = (cards?: TechcardType[]) => {
  return !cards
    ? []
    : cards.map((v) => ({
        label: v.number,
        value: v.id,
      }))
}
