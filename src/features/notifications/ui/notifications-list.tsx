import { Pagination } from '@mui/material'

import { Loader } from '@/shared/ui/loader'
import { EmptyCard } from '@/shared/ui/empty-card'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'

import { NotificationCard } from '@/entities/notifications'

import { useNotificationsList } from '../lib/use-notifications-list'
import { NotificationCreator } from './components/notification-creator'

import cls from './notification-list.module.scss'
import { NotificationFull } from './components/notification-full'

export const NotificationsList = () => {
  const { handlers, values } = useNotificationsList()

  return (
    <section
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
          width: '100%',
        }}
      >
        <Text size="xl" weight="semi">
          Уведомления для пользователей
        </Text>
        <Button mode="secondary" onClick={() => handlers.setIsCreating(true)}>
          Добавить
        </Button>
      </header>

      {values.isPending && <Loader />}
      {!values.isPending && !Boolean(values.notifications?.length) && <EmptyCard />}

      <main className={cls.notification_list}>
        {values.notifications?.map((v) => (
          <NotificationCard
            key={v.id}
            className={cls.notification_list__item}
            notification={v}
            isPreview
            onClick={() => handlers.setNotification(v)}
          />
        ))}
      </main>

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

      <NotificationCreator
        isOpen={values.isCreating}
        onClose={() => handlers.setIsCreating(false)}
      />

      <NotificationFull
        notification={values.notification}
        onClose={() => handlers.setNotification(undefined)}
      />
    </section>
  )
}
