import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { IssueInProcessType } from '@/entities/manufacture'

export const issuesTableConfig = () => {
  const config: TableRowRecordType<IssueInProcessType> = {
    operationName: {
      title: 'Название операции',
      type: 'text',
    },
    description: {
      title: 'Описание',
      type: 'text',
      maxWidth: 200,
    },
    issueNumber: {
      title: 'Номер',
      type: 'text',
    },
    currentQuantity: {
      title: 'Выполнено',
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

  return Object.entries(config) as TableConfigType<IssueInProcessType>
}
