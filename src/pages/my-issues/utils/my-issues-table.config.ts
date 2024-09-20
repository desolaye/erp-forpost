import { MyIssueType } from '@/entities/my-issues'

export const myIssuesTableConfig = (assigner: 'executor' | 'responsible') => {
  const executorSize = assigner === 'responsible' ? '150px' : '0'
  const responsibleSize = assigner === 'executor' ? '150px' : '0'

  type DisplayValues = [
    keyof MyIssueType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<keyof MyIssueType, { size: string; title: string }> = {
    operationName: {
      size: '150px',
      title: 'Операция',
    },
    productName: {
      size: '200px',
      title: 'Продукт',
    },
    description: {
      size: '200px',
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
    executorName: {
      size: executorSize,
      title: 'Исполнитель',
    },
    responsibleName: {
      size: responsibleSize,
      title: 'Ответственный',
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
