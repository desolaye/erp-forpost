import { Pagination } from '@mui/material'

import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { Loader } from '@/shared/ui/loader'
import { EmptyCard } from '@/shared/ui/empty-card'
import { ModalEditor } from '@/shared/ui/modal-editor'

import { useTechcardsPage } from '@/features/manuals/techcards'
import { TechcardCreator } from '@/features/manuals/techcards'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'
import { ModalLayout } from '@/widgets/layouts/modal'

import { SingleTechcard } from './components/single-techcard'
import cls from './manual-techcards-page.module.scss'

const ManualTechcardsPage = () => {
  const { values, handlers } = useTechcardsPage()

  return (
    <PageWrapper title="Технологические карты">
      <section className={cls.techcards_page__layout}>
        <Card style={{ position: 'relative' }}>
          <Input
            full
            placeholder="Поиск по номеру"
            value={values.search}
            onChange={(e) => handlers.setSearch(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {values.count !== 0 && (
              <Pagination
                count={values.count}
                size="large"
                page={values.page}
                onChange={(_, p) => handlers.setPage(p)}
              />
            )}
          </div>

          {values.isPending && <Loader />}
          {!values.isPending && !values.data?.length && <EmptyCard />}

          {values.data?.map((v) => (
            <Button key={v.id} mode="table" onClick={() => handlers.openCard(v.id)}>
              <Text hideOverflow>
                {v.number} - {v.productName}
              </Text>
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

        {values.id && (
          <SingleTechcard id={values.id} onDelete={handlers.deleteTechcard} />
        )}
      </section>

      <ModalLayout isOpen={values.isModalOpen} onClose={handlers.openModal}>
        <ModalEditor
          body={<TechcardCreator onModal={handlers.openModal} />}
          header={
            <Text weight="semi" size="xl">
              Создание технологической карты
            </Text>
          }
        />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ManualTechcardsPage
