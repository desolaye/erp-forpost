import { EmptyCard } from '@/shared/ui/empty-card'
import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

import { ProductDevelopResponseType } from '@/entities/manufacture'
import { productDevelopTableConfig } from '../../utils/product-develop-table.config'

interface IDevelopTableBodyProps {
  data?: ProductDevelopResponseType['developments']
}

export const DevelopTableBody = (props: IDevelopTableBodyProps) => {
  const { data } = props
  const config = productDevelopTableConfig()

  if (!data || !data.length) return <EmptyCard />

  return data.map((issue) => (
    <Button
      key={issue.id}
      mode="table"
      style={{ display: 'flex', gap: 8, width: '100%' }}
    >
      {config.map(([key, value]) => (
        <Text key={key} style={{ width: value.size }} hideOverflow>
          {issue[key]}
        </Text>
      ))}
    </Button>
  ))
}
