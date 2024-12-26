import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { OperationType } from '@/entities/manuals/operations'

type OperationTableType = Omit<OperationType, 'type'> & { type: string }

export const operationsTableConfig = () => {
  const config: TableRowRecordType<OperationTableType> = {
    name: {
      type: 'text',
      title: 'Название',
      width: 200,
    },
    type: {
      type: 'text',
      title: 'Тип',
      width: 150,
    },
    description: {
      type: 'tooltip',
      title: 'Описание',
      width: 200,
      maxWidth: 200,
    },
  }

  return Object.entries(config) as TableConfigType<OperationTableType>
}
