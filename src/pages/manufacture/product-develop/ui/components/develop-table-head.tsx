import { Text } from '@/shared/ui/text'

import { productDevelopTableConfig } from '../../utils/product-develop-table.config'

interface IDevelopTableHeadProps {
  isIssue?: boolean
}

export const DevelopTableHead = (props: IDevelopTableHeadProps) => {
  const { isIssue } = props
  const config = productDevelopTableConfig()

  return (
    <>
      {isIssue && <div style={{ width: '28px' }} />}

      {config.map(([key, value]) => (
        <Text key={key} weight="semi" style={{ width: value.size }} hideOverflow>
          {value.title}
        </Text>
      ))}
    </>
  )
}
