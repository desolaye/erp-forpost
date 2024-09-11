import { ProductType } from '@/entities/manuals'
import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

interface IProductsTableBody {
  data?: ProductType[]
  onModal: (id: string) => void
}

export const ProductsTableBody = (props: IProductsTableBody) => {
  const { data, onModal } = props

  return data?.map((v) => (
    <Button
      key={v.id}
      mode="table"
      onClick={() => onModal(v.id)}
      style={{ display: 'flex', gap: 8 }}
    >
      <Text>{v.name}</Text>
    </Button>
  ))
}
