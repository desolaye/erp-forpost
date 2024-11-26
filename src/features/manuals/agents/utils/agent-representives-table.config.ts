import { AgentRepresentativesType } from '@/entities/manuals'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const agentRepresentivesTableConfig = () => {
  const config: TableRowRecordType<AgentRepresentativesType> = {
    name: {
      type: 'text',
      title: 'ФИО представителя',
      width: 300,
    },
    post: {
      type: 'text',
      title: 'Должность',
      width: 150,
    },
    description: {
      type: 'tooltip',
      title: 'Описание',
      width: 150,
      maxWidth: 150,
    },
    contractorId: {
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
  ) as TableConfigType<AgentRepresentativesType>
}
