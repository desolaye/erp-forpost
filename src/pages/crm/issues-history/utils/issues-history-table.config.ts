import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { IssueHistoryType } from '@/entities/crm/issues-history'

export const issuesHistoryTableConfig = () => {
  const config: TableRowRecordType<IssueHistoryType> = {
    productName: {
      title: 'Продукт',
      type: 'text',
    },
    serialNumber: {
      title: 'Серийный номер',
      type: 'text',
    },
    operationName: {
      title: 'Операция',
      type: 'text',
    },
    description: {
      maxWidth: 150,
      title: 'Описание',
      type: 'text',
    },
    executorName: {
      title: 'Исполнитель',
      type: 'text',
    },
    responsibleName: {
      title: 'Ответственный',
      type: 'text',
    },
    completionDate: {
      title: 'Дата выполнения',
      type: 'text',
    },
  }

  return Object.entries(config) as TableConfigType<IssueHistoryType>
}
