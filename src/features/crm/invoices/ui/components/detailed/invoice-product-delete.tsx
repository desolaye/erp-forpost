import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

type InvoiceProductDeleteProps = {
  invoiceNumber?: string
  productName?: string

  onDelete?: () => void
  onReject?: () => void
}

export const InvoiceProductDelete = (props: InvoiceProductDeleteProps) => {
  const { invoiceNumber, productName, onDelete, onReject } = props

  return (
    <section style={{ padding: '8px' }}>
      <Text style={{ padding: '8px' }}>
        Вы действительно хотите удалить <br /> продукт{' '}
        <Text size="lg" color="error" weight="semi" tag="span">
          {productName}
        </Text>
        <br />
        из счёта{' '}
        <Text size="lg" color="error" weight="semi" tag="span">
          №{invoiceNumber}
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