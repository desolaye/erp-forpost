import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined'

import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { ModalLayout } from '@/shared/ui/modal-layout'

import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { SelectedTechcard } from '@/widgets/techcards/selected-techcard'
import { TechcardsList } from '@/widgets/techcards/techcards-list'
import { TechcardCreator } from '@/widgets/techcards/techcard-creator'
import { OperationsEditor } from '@/widgets/operations/operations-editor'

import { useTechcardsPage } from '../lib/use-techcards-page'

import cls from './techcards-page.module.scss'

const TechcardsPage = () => {
  const { values, pagination, handlers } = useTechcardsPage()

  return (
    <PageWrapper>
      <header className={cls.techcards_page__header}>
        <Text size="xl" weight="semi">
          Технологические карты
        </Text>
        <Button mode="neutral" onClick={() => handlers.setIsOperationsOpen(true)}>
          Редактор операций
        </Button>
      </header>

      <section className={cls.techcards_page__layout}>
        <TechcardsList
          pagination={pagination}
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
        isOpen={values.isOperationsOpen}
        onClose={() => handlers.setIsOperationsOpen(false)}
      >
        <OperationsEditor />
      </ModalLayout>
    </PageWrapper>
  )
}

export default TechcardsPage
