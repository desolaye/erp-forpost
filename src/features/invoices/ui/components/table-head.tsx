import { Text } from '@/shared/ui/text'

import { invoiceProductsTableConfig } from '../../utils/invoice-products-table.config'

export const TableHead = () => {
  const config = invoiceProductsTableConfig()

  return config.map(([key, value]) => (
    <Text key={key} weight="semi" style={{ width: value.size }} hideOverflow>
      {value.title}
    </Text>
  ))
}
