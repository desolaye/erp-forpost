import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined'

import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'

import { SelectedTechcard, TechcardsList } from '@/widgets/techcards'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { useTechcardsPage } from '../lib/use-techcards-page'

import cls from './techcards-page.module.scss'
import { Button } from '@/shared/ui/button'
import { ModalLayout } from '@/shared/ui/modal-layout'
import { TechcardCreator } from '@/widgets/techcards/techcard-creator'

const TechcardsPage = () => {
  const { values, handlers } = useTechcardsPage()

  return (
    <PageWrapper>
      <header
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text size="xl" weight="semi">
          Технологические карты
        </Text>
        <Button mode="neutral" onClick={() => handlers.setIsStepsOpen(true)}>
          Редактор этапов
        </Button>
      </header>

      <section className={cls.techcards_page__layout}>
        <TechcardsList
          count={values.count}
          isLoading={values.isLoadingAll}
          onCardSelect={(id) => handlers.onSelect(id)}
          onCreate={() => handlers.setIsCreateOpen(true)}
          techcards={values.techcards}
          onSearch={handlers.setSearch}
          search={values.search}
        />

        <main className={cls.techcards_page__main}>
          {!values.selectedCard && (
            <Card className={cls.techcards_page__empty_card}>
              <PrecisionManufacturingOutlinedIcon
                className={cls.techcards_page__empty_card__icon}
              />
              <Text weight="semi" size="lg" style={{ color: '#666' }}>
                Выберите технологическую карту из списка
              </Text>
            </Card>
          )}

          {values.selectedCard && (
            <SelectedTechcard
              cardId={values.selectedCard}
              onDelete={() => handlers.onSelect('')}
            />
          )}
        </main>
      </section>

      <ModalLayout
        isOpen={values.isCreateOpen}
        onClose={() => handlers.setIsCreateOpen(false)}
      >
        <TechcardCreator />
      </ModalLayout>

      <ModalLayout
        isOpen={values.isStepsOpen}
        onClose={() => handlers.setIsStepsOpen(false)}
      ></ModalLayout>
    </PageWrapper>
  )
}

export default TechcardsPage
