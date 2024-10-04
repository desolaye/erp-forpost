import { CSSProperties } from 'react'

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

  return (
    <Card className={className} style={{ width: '100%', ...style }} onClick={onClick}>
      <Text size="lg" weight="semi" hideOverflow={isPreview}>
        {notification.authorName}
      </Text>

      <Text hideOverflow={isPreview}>{notification.message}</Text>

      <footer style={{ display: 'flex', justifyContent: 'end' }}>
        <Text size="sm" hideOverflow={isPreview}>
          {notification.createdAt}
        </Text>
      </footer>
    </Card>
  )
}
