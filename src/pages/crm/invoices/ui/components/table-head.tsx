import { Text } from '@/shared/ui/text'

import { invoicesTableConfig } from '../../utils/invoices-table.config'

export const TableHead = () => {
  const config = invoicesTableConfig()

  return config.map(([key, value]) => (
    <Text key={key} weight="semi" style={{ width: value.size }} hideOverflow>
      {value.title}
    </Text>
  ))
}
