import { ProcessType } from '@/entities/manufacture'

export const processesTableConfig = () => {
  type DisplayValues = [
    keyof ProcessType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<keyof ProcessType, { size: string; title: string }> = {
    productName: {
      size: '250px',
      title: 'Продукт',
    },
    techCardNumber: {
      size: '150px',
      title: 'Номер карты',
    },
    batchNumber: {
      size: '150px',
      title: 'Номер партии',
    },
    currentQuantity: {
      size: '125px',
      title: 'Выполнено',
    },
    targetQuantity: {
      size: '125px',
      title: 'Требуется',
    },
    startTime: {
      size: '175px',
      title: 'Время начала',
    },
    endTime: {
      size: '175px',
      title: 'Время окончания',
    },
    status: {
      size: '0',
      title: '',
    },
    techCardId: {
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
