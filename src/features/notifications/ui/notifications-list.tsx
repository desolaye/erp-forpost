import { Pagination } from '@mui/material'

import { Loader } from '@/shared/ui/loader'
import { EmptyCard } from '@/shared/ui/empty-card'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'

import { NotificationCard } from '@/entities/notifications'

import { useNotificationsList } from '../lib/use-notifications-list'

import { NotificationCreator } from './components/notification-creator'
import { NotificationFull } from './components/notification-full'

import cls from './notification-list.module.scss'

export const NotificationsList = () => {
  const { handlers, values } = useNotificationsList()

  return (
    <section className={cls.notification_list__wrapper}>
      <header className={cls.notification_list__header}>
        <Text size="xl" weight="semi">
          Уведомления для пользователей
        </Text>
        <Button mode="secondary" onClick={() => handlers.setIsCreating(true)}>
          Написать
        </Button>
      </header>

      <section className={cls.notification_list__mails}>
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            overflowY: 'scroll',
            height: '100%',
          }}
        >
          <footer style={{ display: 'flex', justifyContent: 'center' }}>
            {Boolean(values.notifications?.length) && (
              <Pagination
                count={values.totalCount}
                size="large"
                page={values.page}
                onChange={(_, p) => handlers.setPage(p)}
              />
            )}
          </footer>

          {values.isPending && <Loader />}
          {!values.isPending && !Boolean(values.notifications?.length) && <EmptyCard />}

          <div className={cls.notification_list}>
            {values.notifications?.map((v) => (
              <NotificationCard
                key={v.id}
                className={cls.notification_list__item}
                notification={v}
                isPreview
                onClick={() => handlers.setNotification(v)}
              />
            ))}
          </div>
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
