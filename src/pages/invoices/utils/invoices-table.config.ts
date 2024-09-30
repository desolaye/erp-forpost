import { InvoiceType } from '@/entities/invoices'

export const invoicesTableConfig = () => {
  type DisplayValues = [
    keyof InvoiceType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<keyof InvoiceType, { size: string; title: string }> = {
    number: {
      size: '200px',
      title: 'Номер счёта',
    },
    description: {
      size: '150px',
      title: 'Описание',
    },
    contractorName: {
      size: '150px',
      title: 'Контрагент',
    },
    daysShipment: {
      size: '150px',
      title: 'Дней до отгрузки',
    },
    dateShipment: {
      size: '125px',
      title: 'Дата отрузки',
    },
    paymentPercentage: {
      size: '150px',
      title: 'Процент оплаты',
    },
    status: {
      size: '150px',
      title: 'Статус',
    },
    contragentId: {
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
