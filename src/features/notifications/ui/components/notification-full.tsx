import { NotificationCard, NotificationType } from '@/entities/notifications'
import { ModalLayout } from '@/widgets/layouts/modal'

interface INotificationFullProps {
  notification?: NotificationType
  onClose?: () => void
}

export const NotificationFull = (props: INotificationFullProps) => {
  const { notification, onClose } = props

  if (!notification) return null

  return (
    <ModalLayout isOpen={Boolean(notification)} onClose={onClose} center bodyBg>
      <NotificationCard notification={notification} />
    </ModalLayout>
  )
}
