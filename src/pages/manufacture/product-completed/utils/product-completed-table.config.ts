import { CompletedProductType } from '@/entities/manufacture'

export const productCompletedTableConfig = () => {
  type DisplayValues = [
    keyof CompletedProductType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<keyof CompletedProductType, { size: string; title: string }> = {
    name: {
      size: '300px',
      title: 'Название',
    },
    serialNumber: {
      size: '200px',
      title: 'Серийный номер',
    },
    productDevelopmentId: {
      size: '0',
      title: '',
    },
    id: {
      size: '0',
      title: '',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.size !== '0',
  ) as DisplayValues
}
