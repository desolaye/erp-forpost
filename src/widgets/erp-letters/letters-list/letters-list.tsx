import { Pagination } from '@mui/material'

import { Loader } from '@/shared/ui/loader'
import { EmptyCard } from '@/shared/ui/empty-card'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'

import { NotificationCard } from '@/entities/notifications'

import { NotificationCreator, NotificationFull } from '@/features/notifications'

import { useLettersList } from './use-letters-list'
import cls from './letters-list.module.scss'

export const LettersList = () => {
  const { handlers, values, pagination } = useLettersList()

  return (
    <section className={cls.letters_list__wrapper}>
      <header className={cls.letters_list__header}>
        <Text size="xl" weight="semi">
          Уведомления для пользователей
        </Text>
        <Button mode="secondary" onClick={() => handlers.setIsCreating(true)}>
          Написать
        </Button>
      </header>

      <section className={cls.letters_list__mails}>
        <main className={cls.letters_list__main}>
          {values.isPending && <Loader />}
          {!values.isPending && !Boolean(values.notifications?.length) && <EmptyCard />}

          <div className={cls.letters_list}>
            {values.notifications?.map((v) => (
              <NotificationCard
                key={v.id}
                className={cls.letters_list__item}
                notification={v}
                isPreview
                onClick={() => handlers.setNotification(v)}
              />
            ))}
          </div>

          <footer style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              {...pagination}
              onChange={(_, p) => pagination.setPage(p)}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </footer>
        </main>

        <NotificationFull
          notification={values.notification}
          onClose={() => handlers.setNotification(undefined)}
        />
      </section>

      <NotificationCreator
        isOpen={values.isCreating}
        onClose={() => handlers.setIsCreating(false)}
      />
    </section>
  )
}
