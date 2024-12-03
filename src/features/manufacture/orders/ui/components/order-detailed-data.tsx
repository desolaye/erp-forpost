import { useState } from 'react'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { Textarea } from '@/shared/ui/textarea'

import {
  ManufacturingOrderProductType,
  ManufacturingOrderType,
} from '@/entities/manufacture'
import { ManufacturingOrderProduct } from '@/entities/manufacture/ui/manufacturing-order-product'
import { ManufacturingOrderProductCreator } from '@/entities/manufacture/ui/manufacturing-order-product-creator'

type Props = {
  order?: ManufacturingOrderType
  products?: ManufacturingOrderProductType[]
  productsAll?: { label: string; value: string }[]
  onCommentChange?: (comment: string) => void
  onProductDelete?: (product: ManufacturingOrderProductType) => void
  onProductCreate?: (productId: string, quantity: number) => void
  onProductEditQuantity?: (quantity: number, id: string) => void
}

export const OrderDetailedData = (props: Props) => {
  const {
    order,
    products,
    productsAll,
    onCommentChange,
    onProductDelete,
    onProductCreate,
    onProductEditQuantity,
  } = props

  const [comment, setComment] = useState(order?.comment || '')

  return (
    <>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Text size="lg" weight="semi">
          Номер счёта
        </Text>

        <Text>{order?.number || 'Отсутствует'}</Text>

        <Textarea
          disabled
          label="Описание из счёта"
          value={order?.description || 'Описание отсутствует'}
          minRows={6}
          maxRows={6}
        />

        <Textarea
          onChange={(e) => setComment(e.target.value)}
          disabled
          label="Комментарий к заказу"
          placeholder="Комментарий к заказу"
          value={comment}
          minRows={6}
          maxRows={6}
        />

        <Button mode="secondary" full onClick={() => onCommentChange?.(comment)}>
          Обновить комментарий
        </Button>
      </section>

      <section style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
        <Text size="lg" weight="semi">
          Продукты в заказе
        </Text>

        <ManufacturingOrderProductCreator
          products={productsAll}
          onCreate={onProductCreate}
        />

        {products?.map((v, i) => (
          <ManufacturingOrderProduct
            key={v.id}
            idx={i + 1}
            product={v}
            onDelete={onProductDelete}
            onEdit={onProductEditQuantity}
          />
        ))}
      </section>
    </>
  )
}
