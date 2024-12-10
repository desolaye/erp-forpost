import { CSSProperties } from 'react'
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined'

import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'

import { NotificationType } from '../model/notification.schema'

interface INotificationCardProps {
  notification: NotificationType
  isPreview?: boolean
  style?: CSSProperties
  className?: string
  onClick?: () => void
}

export const NotificationCard = (props: INotificationCardProps) => {
  const { notification, isPreview, className, style, onClick } = props

  const notificationArticles = notification.message.split('\n')

  return (
    <Card className={className} style={{ width: '100%', ...style }} onClick={onClick}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <PersonPinCircleOutlinedIcon />
        <Text size="lg" weight="semi" hideOverflow>
          {notification.authorName}
        </Text>
      </div>

      {!isPreview && (
        <div
          style={{
            height: '100%',
            overflow: 'auto',
            display: 'flex',
            gap: 8,
            flexDirection: 'column',
          }}
        >
          {notificationArticles.map((v, i) => (
            <Text key={i} hideOverflow={isPreview} breakAll={!isPreview}>
              {v}
            </Text>
          ))}
        </div>
      )}

      {isPreview && (
        <Text hideOverflow={isPreview} breakAll={!isPreview}>
          {notificationArticles[0]}
        </Text>
      )}

      <footer style={{ display: 'flex', justifyContent: 'end' }}>
        <Text size="sm" hideOverflow={isPreview}>
          {notification.createdAt}
        </Text>
      </footer>
    </Card>
  )
}
