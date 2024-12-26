import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { AgentType } from '@/entities/manuals'

type AgentTableType = Omit<AgentType, 'contractorType'> & { contractorType: string }

export const agentTableConfig = () => {
  const config: TableRowRecordType<AgentTableType> = {
    name: {
      type: 'text',
      title: 'Имя контрагента',
      width: 300,
    },
    contractorType: {
      type: 'text',
      title: 'Тип',
    },
  }

  return Object.entries(config) as TableConfigType<AgentTableType>
}
