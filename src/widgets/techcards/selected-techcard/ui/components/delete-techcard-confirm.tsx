import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'

type DeleteTechcardConfirmProps = {
  number?: string
  onDelete?: () => void
  onReject?: () => void
}

export const DeleteTechcardConfirm = (props: DeleteTechcardConfirmProps) => {
  const { number, onDelete, onReject } = props

  return (
    <Card
      style={{
        height: '100%',
        overflow: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text size="lg" weight="semi">
        Вы действительно хотите удалить технологическую карту
        <br />с номером{' '}
        <Text size="lg" weight="semi" tag="span" color="error">
          {number}
        </Text>
        ?
      </Text>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={onDelete}>Подтвердить</Button>
        <Button mode="neutral" onClick={onReject}>
          Отменить
        </Button>
      </div>
    </Card>
  )
}
