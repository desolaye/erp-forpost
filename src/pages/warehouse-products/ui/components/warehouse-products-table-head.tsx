import { Text } from '@/shared/ui/text'

import { warehouseProductsTableConfig } from '../../utils/warehouses-table.config'

export const WarehouseProductsTableHead = () => {
  const config = warehouseProductsTableConfig()

  return config.map(([key, value]) => (
    <Text key={key} weight="semi" style={{ width: value.size }} hideOverflow>
      {value.title}
    </Text>
  ))
}
