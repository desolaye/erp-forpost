import { Text } from '@/shared/ui/text'

import { productDevelopTableConfig } from '../../utils/product-develop-table.config'

export const DevelopTableHead = () => {
  const config = productDevelopTableConfig()

  return config.map(([key, value]) => (
    <Text key={key} weight="semi" style={{ width: value.size }} hideOverflow>
      {value.title}
    </Text>
  ))
}
