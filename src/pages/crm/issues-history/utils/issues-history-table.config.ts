import { IssueHistoryType } from '@/entities/crm/issues-history'

export const issuesHistoryTableConfig = () => {
  type DisplayValues = [
    keyof IssueHistoryType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<keyof IssueHistoryType, { size: string; title: string }> = {
    productName: {
      size: '225px',
      title: 'Продукт',
    },
    operationName: {
      size: '175px',
      title: 'Операция',
    },
    description: {
      size: '150px',
      title: 'Описание',
    },
    executorName: {
      size: '225px',
      title: 'Исполнитель',
    },
    responsibleName: {
      size: '225px',
      title: 'Ответственный',
    },
    completionDate: {
      size: '175px',
      title: 'Дата выполнения',
    },
    productDevelopmentId: {
      size: '0',
      title: '',
    },
    issueId: {
      size: '0',
      title: '',
    },
    executorId: {
      size: '0',
      title: '',
    },
    responsibleId: {
      size: '0',
      title: '',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.size !== '0',
  ) as DisplayValues
}
