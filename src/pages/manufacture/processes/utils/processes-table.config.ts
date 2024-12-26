import { ProcessType } from '@/entities/manufacture'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const processesTableConfig = () => {
  const config: TableRowRecordType<ProcessType> = {
    productName: {
      title: 'Продукт',
      type: 'text',
    },
    techCardNumber: {
      title: 'Номер карты',
      type: 'text',
    },
    batchNumber: {
      title: 'Номер партии',
      type: 'text',
    },
    currentQuantity: {
      title: 'Выполнено',
      type: 'text',
    },
    targetQuantity: {
      title: 'Требуется',
      type: 'text',
    },
    startTime: {
      title: 'Время начала',
      type: 'text',
    },
    endTime: {
      title: 'Время окончания',
      type: 'text',
    },
    status: {
      title: 'Статус процесса',
      type: 'text',
    },
  }

  return Object.entries(config) as TableConfigType<ProcessType>
}
