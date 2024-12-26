import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { InvoiceResponseType } from '@/entities/crm/invoices'
import { getInvoiceStatusesOptions } from '@/entities/crm/invoices/utils/get-invoice-statuses-options'

export const invoicesTableConfig = () => {
  const config: TableRowRecordType<InvoiceResponseType['items'][0]> = {
    number: {
      title: 'Номер счёта',
      type: 'text',
    },
    contragentName: {
      title: 'Контрагент',
      type: 'text',
    },
    invoiceStatus: {
      title: 'Статус счёта',
      type: 'tag',
    },
    priority: {
      title: 'Приоритет',
      type: 'tag',
    },
    createdAt: {
      title: 'Дата создания',
      type: 'text',
    },
    dateShipment: {
      title: 'Дата отрузки',
      type: 'text',
    },
    dateClosing: {
      title: 'Дата закрытия',
      type: 'text',
    },
    paymentDeadline: {
      title: 'Оплата до',
      type: 'text',
    },
    paymentStatus: {
      title: 'Статус оплаты',
      type: 'text',
    },
  }

  const tagColors = getInvoiceStatusesOptions().reduce<{ [key: string]: string }>(
    (prev, curr) => ({ ...prev, [curr.label]: curr.color }),
    { Низкий: '#039532', Средний: '#FFA000', Высокий: '#FF5700' },
  )

  return {
    tagColors,
    config: Object.entries(config) as TableConfigType<InvoiceResponseType['items'][0]>,
  }
}
