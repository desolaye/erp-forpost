import { IssueInProcessType } from '@/entities/manufacture'

export const issuesTableConfig = () => {
  type DisplayValues = [
    keyof IssueInProcessType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<keyof IssueInProcessType, { size: string; title: string }> = {
    operationName: {
      size: '250px',
      title: 'Название операции',
    },
    description: {
      size: '250px',
      title: 'Описание',
    },
    issueNumber: {
      size: '100px',
      title: 'Номер',
    },
    currentQuantity: {
      size: '125px',
      title: 'Выполнено',
    },
    startTime: {
      size: '175px',
      title: 'Время начала',
    },
    endTime: {
      size: '175px',
      title: 'Время окончания',
    },
    status: {
      size: '175px',
      title: 'Статус процесса',
    },
    executorId: {
      size: '0',
      title: '',
    },
    responsibleId: {
      size: '0',
      title: '',
    },
    id: {
      size: '0',
      title: '',
    },
    productCompositionFlag: {
      size: '0',
      title: '',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.size !== '0',
  ) as DisplayValues
}
