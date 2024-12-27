import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { getNotificationsAll, NotificationType } from '@/entities/notifications'

export const useLettersList = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [notification, setNotification] = useState<NotificationType>()

  const { getTotalCount, page, params, setPage } = usePagination(15)

  const { data, isPending } = useQuery({
    queryFn: () =>
      getNotificationsAll({
        ...params,
      }),
    queryKey: ['notifications_all', page],
  })

  const open = (notification?: NotificationType) => setNotification(notification)

  return {
    values: {
      notifications: data?.notifications,
      notification,
      isPending,
      isCreating,
    },
    pagination: {
      page,
      totalCount: getTotalCount(data?.totalCount),
      setPage,
    },
    handlers: {
      open,
      setIsCreating,
      setNotification,
    },
  }
}
