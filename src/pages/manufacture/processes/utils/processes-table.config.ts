import { ProcessType } from '@/entities/manufacture'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const processesTableConfig = () => {
  const config: TableRowRecordType<ProcessType> = {
    productName: {
      width: 275,
      title: 'Продукт',
      type: 'text',
    },
    techCardNumber: {
      width: 150,
      title: 'Номер карты',
      type: 'text',
    },
    batchNumber: {
      width: 150,
      title: 'Номер партии',
      type: 'text',
    },
    currentQuantity: {
      width: 125,
      title: 'Выполнено',
      type: 'text',
    },
    targetQuantity: {
      width: 125,
      title: 'Требуется',
      type: 'text',
    },
    startTime: {
      width: 175,
      title: 'Время начала',
      type: 'text',
    },
    endTime: {
      width: 175,
      title: 'Время окончания',
      type: 'text',
    },
    status: {
      width: 175,
      title: 'Статус процесса',
      type: 'text',
    },
    techCardId: {
      width: 0,
      title: '',
      type: 'text',
    },
    productId: {
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
  ) as TableConfigType<ProcessType>
}
