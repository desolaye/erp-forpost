import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'

import { useTechcardsPage } from '@/features/manuals/techcards'
import { SingleTechcard } from './components/single-techcard'

export const ManualTechcardsPage = () => {
  const { values, handlers } = useTechcardsPage()

  return (
    <article
      style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}
    >
      <Text size="2xl" weight="semi">
        Технологические карты
      </Text>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '12px',
          height: '100%',
        }}
      >
        <Card>
          <Input full placeholder="Поиск по номеру" />
          {values.data?.map((v) => (
            <Button key={v.id} mode="table" onClick={() => handlers.handleOpenCard(v.id)}>
              {v.number}
            </Button>
          ))}
        </Card>
        {values.id && <SingleTechcard id={values.id} />}
      </section>
    </article>
  )
}
