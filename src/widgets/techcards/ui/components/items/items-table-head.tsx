import { Text } from '@/shared/ui/text'
import { getDisplayValuesItems } from '../../../utils/get-display-values-items'

export const ItemsTableHead = () => {
  return getDisplayValuesItems().map(([key, value]) => (
    <Text key={key} weight="semi" style={{ width: value.size }}>
      {value.title}
    </Text>
  ))
}
