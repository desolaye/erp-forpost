import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'

import { useSingleTechcard } from '@/features/manuals/techcards'

interface ISingleTechcard {
  id: string
}

export const SingleTechcard = (props: ISingleTechcard) => {
  const { values } = useSingleTechcard(props.id)

  if (values.isPending || !values.data) return <Text>Loading...</Text>

  return (
    <Card style={{ gridColumn: 'span 3 / span 3' }}>
      <Text size="xl" weight="semi">
        Номер: {values.data.number}
      </Text>
      <Text size="lg">Описание: {values.data.description || 'Отсутствует'}</Text>

      <Text size="xl" weight="semi">
        Этапы
      </Text>

      {values.data.steps.map((v) => (
        <Text key={v.operationName}>{v.operationName}</Text>
      ))}

      <Text size="xl" weight="semi">
        Продукты
      </Text>

      {values.data.items.map((v) => (
        <Text key={v.productId}>{v.productName}</Text>
      ))}
    </Card>
  )
}
