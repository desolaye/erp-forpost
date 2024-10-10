import { AgentType } from '@/entities/manuals'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const agentTableConfig = () => {
  const config: TableRowRecordType<AgentType> = {
    name: {
      type: 'text',
      title: 'Имя агента',
      width: 200,
    },
    id: {
      type: 'text',
      title: 'id',
      width: 0,
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<AgentType>
}
