import { Text } from '@/shared/ui/text'
import { productCompletedTableConfig } from '../../utils/product-completed-table.config'

export const TableHead = () => {
  const config = productCompletedTableConfig()

  return config.map(([key, value]) => (
    <Text key={key} weight="semi" style={{ width: value.size }} hideOverflow>
      {value.title}
    </Text>
  ))
}
