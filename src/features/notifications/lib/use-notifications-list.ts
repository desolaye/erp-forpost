import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { getNotificationsAll, NotificationType } from '@/entities/notifications'

export const useNotificationsList = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [notification, setNotification] = useState<NotificationType>()

  const { getTotalCount, page, params, setPage } = usePagination(3)

  const { data, isPending } = useQuery({
    queryFn: () =>
      getNotificationsAll({
        params,
      }),
    queryKey: ['notifications_all', page],
  })

  const open = (notification?: NotificationType) => setNotification(notification)

  return {
    values: {
      notifications: data?.notifications,
      notification,
      totalCount: getTotalCount(data?.totalCount),
      page,
      isPending,
      isCreating,
    },
    handlers: {
      open,
      setPage,
      setIsCreating,
      setNotification,
    },
  }
}
