import { TechcardItemType } from '@/entities/manuals'
import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

import { useItemsTable } from '../../../lib/use-items-table'

interface IStaffTableBody {
  data?: TechcardItemType[]
}

export const ItemsTableBody = (props: IStaffTableBody) => {
  const { data } = props
  const { getDisplayValues } = useItemsTable()

  return data?.map((pr) => (
    <Button key={pr.productId} mode="table" style={{ display: 'flex', gap: 8 }}>
      {getDisplayValues().map(([key, value]) => (
        <Text key={key} style={{ width: value.size, overflow: 'hidden' }}>
          {pr[key]}
        </Text>
      ))}
    </Button>
  ))
}
