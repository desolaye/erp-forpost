import { ProductDevelopType } from '@/entities/manufacture'

export const productDevelopTableConfig = () => {
  type DisplayValues = [
    keyof ProductDevelopType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<keyof ProductDevelopType, { size: string; title: string }> = {
    productName: {
      size: '250px',
      title: 'Продукт',
    },
    batchNumber: {
      size: '150px',
      title: 'Номер партии',
    },
    operationName: {
      size: '150px',
      title: 'Операция',
    },
    serialNumber: {
      size: '200px',
      title: 'Серийный номер',
    },
    settingOption: {
      size: '200px',
      title: 'Вариант настройки',
    },
    status: {
      size: '150px',
      title: 'Статус',
    },
    manufacturingProcessId: {
      size: '0',
      title: '',
    },
    issueId: {
      size: '0',
      title: '',
    },
    productId: {
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
