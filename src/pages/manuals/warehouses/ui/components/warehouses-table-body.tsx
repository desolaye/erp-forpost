import { WarehouseType } from '@/entities/manuals'
import { Button } from '@/shared/ui/button'
import { EmptyCard } from '@/shared/ui/empty-card'
import { Text } from '@/shared/ui/text'

interface IWarehousesTableBody {
  data?: WarehouseType[]
}

export const WarehousesTableBody = (props: IWarehousesTableBody) => {
  const { data } = props

  if (!data) return <EmptyCard />

  return data.map((v) => (
    <Button key={v.id} mode="table" style={{ display: 'flex', gap: 8 }}>
      <Text>{v.name}</Text>
    </Button>
  ))
}
