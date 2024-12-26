import { AgentRepresentativesType } from '@/entities/manuals'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const agentRepresentivesTableConfig = () => {
  const config: TableRowRecordType<AgentRepresentativesType> = {
    name: {
      type: 'text',
      title: 'ФИО представителя',
    },
    post: {
      type: 'text',
      title: 'Должность',
    },
    description: {
      type: 'tooltip',
      title: 'Описание',
      maxWidth: 150,
    },
  }

  return Object.entries(config) as TableConfigType<AgentRepresentativesType>
}
