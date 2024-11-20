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
    contragentName: {
      width: 150,
      title: 'Контрагент',
      type: 'text',
    },
    createdAt: {
      width: 150,
      title: 'Дата создания',
      type: 'text',
    },
    dateClosing: {
      width: 150,
      title: 'Дата закрытия',
      type: 'text',
    },
    invoiceStatus: {
      width: 150,
      title: 'Статус счёта',
      type: 'text',
    },
    paymentDeadline: {
      width: 150,
      title: 'Оплата до',
      type: 'text',
    },
    paymentStatus: {
      width: 150,
      title: 'Статус оплаты',
      type: 'text',
    },
    priority: {
      width: 150,
      title: 'Приоритет',
      type: 'text',
    },
    dateShipment: {
      width: 125,
      title: 'Дата отрузки',
      type: 'text',
    },
    contractorId: {
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
