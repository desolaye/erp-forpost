import { Checkbox, FormControlLabel } from '@mui/material'
import { AppNotificationType, AppStaffNotificationType } from '@/entities/manuals'

type UserNotificationCheckboxProps = {
  userNotifications?: AppStaffNotificationType[]
  notification: AppNotificationType
  onClick: (id: string, isChecked: boolean) => void
}

export const UserNotificationCheckbox = (props: UserNotificationCheckboxProps) => {
  const { notification, userNotifications, onClick } = props

  const checkedId =
    userNotifications?.find((v) => v.notificationId === notification.id)?.id || ''

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={Boolean(checkedId)}
          onChange={() =>
            onClick(Boolean(checkedId) ? checkedId : notification.id, Boolean(checkedId))
          }
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label={notification.notificationName}
    />
  )
}
