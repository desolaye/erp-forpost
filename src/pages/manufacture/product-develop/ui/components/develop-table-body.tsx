import { EmptyCard } from '@/shared/ui/empty-card'
import { TableRow } from '@/shared/ui/table-row'

import { ProductDevelopResponseType } from '@/entities/manufacture'
import { productDevelopTableConfig } from '../../utils/product-develop-table.config'

interface IDevelopTableBodyProps {
  data?: ProductDevelopResponseType['developments']
  isIssue?: boolean
  onCheck?: (id: string) => void
}

export const DevelopTableBody = (props: IDevelopTableBodyProps) => {
  const { data, isIssue, onCheck } = props
  const config = productDevelopTableConfig()

  if (!data || !data.length) return <EmptyCard />

  return data.map((issue) => (
    <TableRow
      config={config}
      data={issue}
      key={issue.id}
      onCheck={isIssue ? () => onCheck?.(issue.id) : undefined}
    />
  ))
}
