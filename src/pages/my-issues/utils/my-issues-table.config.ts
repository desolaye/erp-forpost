import { MyIssueType } from '@/entities/my-issues'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const myIssuesTableConfig = (assigner: 'executor' | 'responsible') => {
  const executorSize = assigner === 'responsible' ? 150 : 0
  const responsibleSize = assigner === 'executor' ? 150 : 0

  const config: TableRowRecordType<MyIssueType> = {
    operationName: {
      title: 'Операция',
      type: 'text',
    },
    productName: {
      title: 'Продукт',
      type: 'text',
    },
    description: {
      maxWidth: 150,
      title: 'Описание',
      type: 'tooltip',
    },
    issueNumber: {
      title: 'Номер',
      type: 'text',
    },
    currentQuantity: {
      title: 'Выполнено',
      type: 'text',
    },
    targetQuantity: {
      title: 'Целевое кол-во',
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
    executorName: {
      width: executorSize,
      title: 'Исполнитель',
      type: 'text',
    },
    responsibleName: {
      width: responsibleSize,
      title: 'Ответственный',
      type: 'text',
    },
  }

  return Object.entries(config) as TableConfigType<MyIssueType>
}
