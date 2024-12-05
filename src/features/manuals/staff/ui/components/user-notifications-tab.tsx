import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Loader } from '@/shared/ui/loader'
import { Text } from '@/shared/ui/text'

import {
  deleteAppStaffNotificationById,
  getAppNotificationList,
  getAppStaffNotificationsById,
  postSubscribeToAppNotification,
} from '@/entities/manuals'

import { UserNotificationCheckbox } from './user-notification-checkbox'

type UserNotificationsTabProps = {
  userId: string
}

export const UserNotificationsTab = (props: UserNotificationsTabProps) => {
  const { userId } = props
  const queryClient = useQueryClient()

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['user_app_notifications', userId] })
    queryClient.invalidateQueries({ queryKey: ['app_notification_list'] })
  }

  const { data: appNotifications, isFetching: isLoadingAppNotifications } = useQuery({
    queryFn: () => getAppNotificationList(),
    queryKey: ['app_notification_list'],
    refetchOnWindowFocus: false,
  })

  const { data: userAppNotifications, isFetching: isLoadingUserAppNotifications } =
    useQuery({
      queryFn: () => getAppStaffNotificationsById(userId),
      queryKey: ['user_app_notifications', userId],
      refetchOnWindowFocus: false,
    })

  const subscribeUser = useMutation({
    mutationFn: (notificationId: string) =>
      postSubscribeToAppNotification({ userId, notificationId }),
    onSuccess,
  })

  const unsubscribeUser = useMutation({
    mutationFn: deleteAppStaffNotificationById,
    onSuccess,
  })

  const onClick = (notificationId: string, isSubscribed: boolean) => {
    console.log(notificationId, isSubscribed)

    if (!isSubscribed) subscribeUser.mutateAsync(notificationId)
    else unsubscribeUser.mutateAsync(notificationId)
  }

  if (isLoadingAppNotifications || isLoadingUserAppNotifications) return <Loader />

  return (
    <section style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
      <Text size="sm">
        Выберите, на какие события пользователю будет приходить уведомление
      </Text>
      {appNotifications?.map((v) => (
        <UserNotificationCheckbox
          key={v.id}
          notification={v}
          onClick={onClick}
          userNotifications={userAppNotifications}
        />
      ))}
    </section>
  )
}
