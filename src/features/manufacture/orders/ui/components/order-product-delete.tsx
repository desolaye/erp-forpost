import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

type Props = {
  orderNumber?: string
  productName?: string

  onDelete?: () => void
  onReject?: () => void
}

export const OrderProductDelete = (props: Props) => {
  const { orderNumber, productName, onDelete, onReject } = props

  return (
    <section style={{ padding: '8px' }}>
      <Text style={{ padding: '8px' }}>
        Вы действительно хотите удалить <br /> продукт{' '}
        <Text size="lg" color="error" weight="semi" tag="span">
          {productName}
        </Text>
        <br />
        из заказа{' '}
        <Text size="lg" color="error" weight="semi" tag="span">
          №{orderNumber}
        </Text>
        ?
      </Text>
      <div style={{ gap: 8, display: 'flex' }}>
        <Button full onClick={onDelete}>
          Подтвердить
        </Button>
        <Button full mode="neutral" onClick={onReject}>
          Отменить
        </Button>
      </div>
    </section>
  )
}
