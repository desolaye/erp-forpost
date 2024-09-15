import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'
// import { Button } from '@/shared/ui/button'

import { TechcardFullType } from '@/entities/manuals'

interface ITechcardGeneralInfoProps {
  tab: number
  index: number
  number: TechcardFullType['number']
  description: TechcardFullType['description']
}

export const TechcardGeneralInfo = (props: ITechcardGeneralInfoProps) => {
  const { tab, index, description, number } = props

  if (tab !== index) return null

  return (
    <Card style={{ height: '100%', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Text size="xl" weight="semi">
          Номер карты: {number}
        </Text>
        <Text size="lg">Описание: {description || 'Отсутствует'}</Text>
      </div>
      {/* <div style={{ display: 'flex', gap: 12 }}>
        <Button mode="secondary" full>
          Удалить
        </Button>
      </div> */}
    </Card>
  )
}
