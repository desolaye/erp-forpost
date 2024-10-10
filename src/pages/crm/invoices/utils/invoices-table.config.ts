import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { InvoiceType } from '@/entities/invoices'

export const invoicesTableConfig = () => {
  const config: TableRowRecordType<InvoiceType> = {
    number: {
      width: 200,
      title: 'Номер счёта',
      type: 'text',
    },
    description: {
      width: 150,
      maxWidth: 150,
      title: 'Описание',
      type: 'text',
    },
    contractorName: {
      width: 150,
      title: 'Контрагент',
      type: 'text',
    },
    daysShipment: {
      width: 150,
      title: 'Дней до отгрузки',
      type: 'text',
    },
    dateShipment: {
      width: 125,
      title: 'Дата отрузки',
      type: 'text',
    },
    paymentPercentage: {
      width: 150,
      title: 'Процент оплаты',
      type: 'text',
    },
    status: {
      width: 150,
      title: 'Статус',
      type: 'text',
    },
    contragentId: {
      width: 0,
      title: '',
      type: 'text',
    },
    id: {
      width: 0,
      title: '',
      type: 'text',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<InvoiceType>
}
