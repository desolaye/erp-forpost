import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined'

import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'
import { NotificationCard, NotificationType } from '@/entities/notifications'

interface INotificationFullProps {
  notification?: NotificationType
  onClose?: () => void
}

export const NotificationFull = (props: INotificationFullProps) => {
  const { notification } = props

  if (!notification) {
    return (
      <Card
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DraftsOutlinedIcon style={{ width: '64px', height: '64px', color: '#666' }} />
        <Text size="lg" weight="semi" pos="center" style={{ color: '#666' }}>
          Выберите сообщение из списка для просмотра
        </Text>
      </Card>
    )
  }

  return (
    <NotificationCard
      notification={notification}
      style={{ overflow: 'hidden', height: 'calc(100vh - 100px)' }}
    />
  )
}
