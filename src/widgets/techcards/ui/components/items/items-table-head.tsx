import { Text } from '@/shared/ui/text'
import { useItemsTable } from '../../../lib/use-items-table'

export const ItemsTableHead = () => {
  const { getDisplayValues } = useItemsTable()

  return getDisplayValues().map(([key, value]) => (
    <Text key={key} weight="semi" style={{ width: value.size }}>
      {value.title}
    </Text>
  ))
}
