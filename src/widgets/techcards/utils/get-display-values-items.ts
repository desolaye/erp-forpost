import { TechcardItemType } from '@/entities/manuals'

export const getDisplayValuesItems = () => {
  type DisplayValues = [
    keyof TechcardItemType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<keyof TechcardItemType, { size: string; title: string }> = {
    productName: {
      size: '350px',
      title: 'Название компонента',
    },
    quantity: {
      size: '100px',
      title: 'Количество',
    },
    productId: {
      size: '0',
      title: '',
    },
    techCardId: {
      size: '0',
      title: '',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.size !== '0',
  ) as DisplayValues
}
