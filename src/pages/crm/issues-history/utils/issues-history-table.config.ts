import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { IssueHistoryType } from '@/entities/crm/issues-history'

export const issuesHistoryTableConfig = () => {
  const config: TableRowRecordType<IssueHistoryType> = {
    productName: {
      width: 225,
      title: 'Продукт',
      type: 'text',
    },
    serialNumber: {
      width: 225,
      title: 'Серийный номер',
      type: 'text',
    },
    operationName: {
      width: 175,
      title: 'Операция',
      type: 'text',
    },
    description: {
      width: 150,
      maxWidth: 150,
      title: 'Описание',
      type: 'text',
    },
    executorName: {
      width: 225,
      title: 'Исполнитель',
      type: 'text',
    },
    responsibleName: {
      width: 225,
      title: 'Ответственный',
      type: 'text',
    },
    completionDate: {
      width: 175,
      title: 'Дата выполнения',
      type: 'text',
    },
    productDevelopmentId: {
      width: 0,
      title: '',
      type: 'text',
    },
    issueId: {
      width: 0,
      title: '',
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
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<IssueHistoryType>
}
