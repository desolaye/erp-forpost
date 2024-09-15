import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { EmptyCard } from '@/shared/ui/empty-card'

import { TechcardItemType } from '@/entities/manuals'
import { getDisplayValuesItems } from '../../../utils/get-display-values-items'

interface IStaffTableBody {
  data?: TechcardItemType[]
}

export const ItemsTableBody = (props: IStaffTableBody) => {
  const { data } = props

  if (!data || !data.length) return <EmptyCard />

  return data.map((pr) => (
    <Button key={pr.productId} mode="table" style={{ display: 'flex', gap: 8 }}>
      {getDisplayValuesItems().map(([key, value]) => (
        <Text key={key} style={{ width: value.size, overflow: 'hidden' }}>
          {pr[key]}
        </Text>
      ))}
    </Button>
  ))
}
