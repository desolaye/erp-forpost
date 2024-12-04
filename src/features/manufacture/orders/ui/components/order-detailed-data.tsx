import { useState } from 'react'
import { Tooltip } from '@mui/material'
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { Textarea } from '@/shared/ui/textarea'

import { InvoiceProductResponseType } from '@/entities/crm/invoices'

import {
  ManufacturingOrderProductType,
  ManufacturingOrderType,
} from '@/entities/manufacture'
import { ManufacturingOrderProduct } from '@/entities/manufacture/ui/manufacturing-order-product'
import { ManufacturingOrderProductCreator } from '@/entities/manufacture/ui/manufacturing-order-product-creator'

type Props = {
  order?: ManufacturingOrderType
  products?: ManufacturingOrderProductType[]
  productsInvoice?: InvoiceProductResponseType[]
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
    productsInvoice,
    onCommentChange,
    onProductDelete,
    onProductCreate,
    onProductEditQuantity,
  } = props

  const [comment, setComment] = useState(order?.comment || '')

  return (
    <>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <section style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              gap: 8,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text size="lg" weight="semi">
              Продукты в заказе
            </Text>

            <Tooltip
              title={
                <div>
                  {productsInvoice?.map((v) => (
                    <Text key={v.id} style={{ padding: '8px 2px' }} breakAll>
                      <Text tag="span" weight="semi" breakAll>
                        {v.name}
                      </Text>{' '}
                      - {v.quantity}шт.
                    </Text>
                  ))}
                </div>
              }
            >
              <Button
                mode="neutral"
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  padding: '2px 4px',
                }}
              >
                <InventoryOutlinedIcon style={{ width: 24, height: 24 }} />
                <Text>Продукты в счёте</Text>
              </Button>
            </Tooltip>
          </div>

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
      </section>
    </>
  )
}
