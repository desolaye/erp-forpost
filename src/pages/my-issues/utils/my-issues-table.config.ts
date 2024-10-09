import { MyIssueType } from '@/entities/my-issues'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const myIssuesTableConfig = (assigner: 'executor' | 'responsible') => {
  const executorSize = assigner === 'responsible' ? 150 : 0
  const responsibleSize = assigner === 'executor' ? 150 : 0

  const config: TableRowRecordType<MyIssueType> = {
    operationName: {
      width: 125,
      title: 'Операция',
      type: 'text',
    },
    productName: {
      width: 250,
      title: 'Продукт',
      type: 'text',
    },
    description: {
      width: 150,
      maxWidth: 150,
      title: 'Описание',
      type: 'text',
    },
    issueNumber: {
      width: 75,
      title: 'Номер',
      type: 'text',
    },
    currentQuantity: {
      width: 125,
      title: 'Выполнено',
      type: 'text',
    },
    targetQuantity: {
      width: 150,
      title: 'Целевое кол-во',
      type: 'text',
    },
    startTime: {
      width: 150,
      title: 'Время начала',
      type: 'text',
    },
    endTime: {
      width: 175,
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
    executorId: {
      width: 0,
      title: '',
      type: 'text',
    },
    responsibleId: {
      width: 0,
      title: '',
      type: 'text',
    },
    id: {
      width: 0,
      title: '',
      type: 'text',
    },
    productCompositionFlag: {
      width: 0,
      title: '',
      type: 'text',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<MyIssueType>
}
