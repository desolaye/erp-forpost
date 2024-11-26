import { AgentType } from '@/entities/manuals'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const agentTableConfig = () => {
  const config: TableRowRecordType<
    Omit<AgentType, 'contractType'> & { contractType: string }
  > = {
    name: {
      type: 'text',
      title: 'Имя контрагента',
      width: 300,
    },
    city: {
      type: 'text',
      title: 'id',
      width: 0,
    },
    contractType: {
      type: 'text',
      title: 'Тип',
      width: 250,
    },
    country: {
      type: 'text',
      title: 'id',
      width: 0,
    },
    description: {
      type: 'text',
      title: 'id',
      width: 0,
    },
    discountLevel: {
      type: 'text',
      title: 'id',
      width: 0,
    },
    inn: {
      type: 'text',
      title: 'id',
      width: 0,
    },
    logisticInfo: {
      type: 'text',
      title: 'id',
      width: 0,
    },
    id: {
      type: 'text',
      title: 'id',
      width: 0,
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<Omit<AgentType, 'contractType'> & { contractType: string }>
}
