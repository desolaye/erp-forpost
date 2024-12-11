import { CSSProperties, useState } from 'react'
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined'
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'

import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'

import { NotificationType } from '../model/notification.schema'
import cls from './notification-card.module.scss'
import { Button } from '@/shared/ui/button'
import { FileAdd } from '@/shared/ui/file'
import { File } from '@/entities/files'
import { useFileLoader } from '@/shared/lib/use-file-loader'
import { Loader } from '@/shared/ui/loader'

interface INotificationCardProps {
  notification: NotificationType
  isPreview?: boolean
  style?: CSSProperties
  className?: string
  onClick?: () => void
}

export const NotificationCard = (props: INotificationCardProps) => {
  const { notification, isPreview, className, style, onClick } = props

  const [isFilesOpen, setIsFilesOpen] = useState(false)

  const {
    files,
    isPendingFile: isLoadingFile,
    mutateFile,
  } = useFileLoader(notification.id, 'files_all')

  const notificationArticles = notification.message.split('\n')

  return (
    <Card className={className} style={{ width: '100%', ...style }} onClick={onClick}>
      <div className={cls.notification_card__header}>
        <div className={cls.notification_card__header__person}>
          <PersonPinCircleOutlinedIcon />
          <Text size="lg" weight="semi" hideOverflow>
            {notification.authorName}
          </Text>
        </div>

        {!isPreview && (
          <div className={cls.notification_card__header__person}>
            <Text size="sm">{notification.createdAt}</Text>
            <Button
              onClick={() => setIsFilesOpen((prev) => !prev)}
              mode="neutral"
              style={{ padding: '2px 4px' }}
            >
              {isFilesOpen ? <ArticleOutlinedIcon /> : <FilePresentOutlinedIcon />}
            </Button>
          </div>
        )}
      </div>

      {!isPreview && !isFilesOpen && (
        <div className={cls.notification_card__mail}>
          {notificationArticles.map((v, i) => (
            <Text key={i} hideOverflow={isPreview} breakAll={!isPreview}>
              {v}
            </Text>
          ))}
        </div>
      )}

      {isFilesOpen && !isLoadingFile && (
        <>
          <FileAdd onLoad={mutateFile} />
          {files?.map((file) => (
            <File title={file.fileName} link={file.id} key={file.id} />
          ))}
        </>
      )}

      {isLoadingFile && <Loader />}

      {isPreview && (
        <Text hideOverflow={isPreview} breakAll={!isPreview}>
          {notificationArticles[0]}
        </Text>
      )}

      {isPreview && (
        <footer className={cls.notification_card__footer}>
          <Text size="sm">{notification.createdAt}</Text>
        </footer>
      )}
    </Card>
  )
}
