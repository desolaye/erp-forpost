import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { Button } from '@/shared/ui/button'
import { Select } from '@/shared/ui/select'
import { Input } from '@/shared/ui/input'

import { TechcardItemType } from '@/entities/manuals/techcards'

type TechcardItemProps = {
  item: Omit<TechcardItemType, 'quantity'> & { quantity: string }
  products: { label: string; value: string }[]

  onSearch?: (val: string) => void
  onDelete?: (id: string) => void
  onProductEdit?: (product: { label: string; value: string }) => void
  onQuantityEdit?: (quantity: string) => void
}

export const TechcardItem = (props: TechcardItemProps) => {
  const { item, products, onDelete, onProductEdit, onQuantityEdit, onSearch } = props

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Select
        className="full"
        options={products}
        onChange={(e) => onProductEdit?.(e)}
        onSearch={(val) => onSearch?.(val)}
        value={{ label: item.productName, value: item.productId }}
      />
      <Input
        value={item.quantity}
        onChange={(e) => onQuantityEdit?.(e.target.value)}
        style={{ minWidth: '100px', width: '100px', maxWidth: '100px' }}
      />
      <Button
        mode="secondary"
        onClick={() => onDelete?.(item.id)}
        style={{ padding: '2px 4px', minWidth: 24, minHeight: 24 }}
      >
        <DeleteOutlineOutlinedIcon style={{ width: 24, height: 24 }} />
      </Button>
    </div>
  )
}
