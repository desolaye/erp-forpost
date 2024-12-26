import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

type InvoiceDeleteProps = {
  invoiceNumber?: string
  onDelete?: () => void
  onReject?: () => void
}

export const InvoiceDelete = (props: InvoiceDeleteProps) => {
  const { invoiceNumber, onDelete, onReject } = props

  return (
    <section
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text size="lg" style={{ padding: '8px', textAlign: 'center' }} weight="semi">
        Вы действительно хотите удалить счёт{' '}
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
