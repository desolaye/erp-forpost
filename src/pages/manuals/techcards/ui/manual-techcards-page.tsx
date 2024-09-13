import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { Loader } from '@/shared/ui/loader'
import { EmptyCard } from '@/shared/ui/empty-card'

import { useTechcardsPage } from '@/features/manuals/techcards'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { SingleTechcard } from './components/single-techcard'
import cls from './manual-techcards-page.module.scss'

export const ManualTechcardsPage = () => {
  const { values, handlers } = useTechcardsPage()

  return (
    <PageWrapper>
      <Text size="2xl" weight="semi">
        Технологические карты
      </Text>

      <section className={cls.techcards_page__layout}>
        <Card style={{ position: 'relative' }}>
          <Input full placeholder="Поиск по номеру" />
          {values.isPending && <Loader />}
          {!values.isPending && !values.data?.length && <EmptyCard />}
          {values.data?.map((v) => (
            <Button key={v.id} mode="table" onClick={() => handlers.openCard(v.id)}>
              {v.number}
            </Button>
          ))}
          {!values.isPending && (
            <Button
              onClick={handlers.openModal}
              className={cls.techcards_page__button}
              mode="secondary"
            >
              Создать карту
            </Button>
          )}
        </Card>
        {values.id && <SingleTechcard id={values.id} />}
      </section>
    </PageWrapper>
  )
}
