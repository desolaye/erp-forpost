import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { ManufacturingOrderType } from '@/entities/manufacture'

export const manufacturingOrdersTableConfig = () => {
  const config: TableRowRecordType<ManufacturingOrderType> = {
    number: {
      width: 200,
      title: 'Номер счёта',
      type: 'text',
    },
    manufacturingOrderStatus: {
      width: 200,
      title: 'Статус заказа',
      type: 'text',
    },
    priority: {
      width: 200,
      title: 'Приоритет заказа',
      type: 'text',
    },
    createdAt: {
      width: 200,
      title: 'Дата поступления',
      type: 'text',
    },
    description: {
      width: 0,
      maxWidth: 0,
      title: 'Описание',
      type: 'text',
    },
    comment: {
      width: 0,
      title: '',
      type: 'text',
    },
    invoiceId: {
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
  ) as TableConfigType<ManufacturingOrderType>
}
