import { useState } from 'react'

import { EmptyCard } from '@/shared/ui/empty-card'
import { TableRow } from '@/shared/ui/table-row'

import { ProductDevelopResponseType } from '@/entities/manufacture'
import { ProductDevelopTooltip } from './product-develop-tooltip'
import { ModalLayout } from '@/widgets/layouts/modal'
import { ProductStructureCompose } from '@/features/manufacture/product-develop'
import { productDevelopTableConfig } from '../../utils/product-develop-table.config'

interface IDevelopTableBodyProps {
  data?: ProductDevelopResponseType['developments']
  isIssue?: boolean
  isComposable?: boolean
  onCheck?: (id: string) => void
}

export const DevelopTableBody = (props: IDevelopTableBodyProps) => {
  const { data, isIssue, isComposable, onCheck } = props
  const config = productDevelopTableConfig()

  const [issueId, setIssueId] = useState('')

  if (!data || !data.length) return <EmptyCard />

  return (
    <>
      {data.map((product) => (
        <TableRow
          config={config}
          data={product}
          key={product.id}
          onCheck={isIssue ? () => onCheck?.(product.id) : undefined}
          actions={
            isComposable ? (
              <ProductDevelopTooltip onSetStructure={() => setIssueId(product.id)} />
            ) : undefined
          }
        />
      ))}

      <ModalLayout isOpen={Boolean(issueId)} onClose={() => setIssueId('')} center>
        <ProductStructureCompose
          productDevelopId={issueId}
          onClose={() => setIssueId('')}
        />
      </ModalLayout>
    </>
  )
}
