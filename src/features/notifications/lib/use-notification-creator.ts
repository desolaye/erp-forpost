import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  NotificationValidatorType,
  postCreateNotification,
  ZNotificationValidator,
} from '@/entities/notifications'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IUseNotificationCreator {
  onClose?: () => void
}

export const useNotificationCreator = (props: IUseNotificationCreator) => {
  const { onClose } = props
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit: submit,
    formState: { errors },
  } = useForm<NotificationValidatorType>({
    resolver: zodResolver(ZNotificationValidator),
  })

  const { mutateAsync } = useMutation({
    mutationFn: (data: NotificationValidatorType) => postCreateNotification(data.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications_all'] })
      if (onClose) onClose()
    },
  })

  const onSubmit: SubmitHandler<NotificationValidatorType> = (data) => {
    mutateAsync(data)
  }

  const onReset = onClose

  return {
    values: {
      errors,
    },
    handlers: {
      onSubmit,
      onReset,
      register,
      submit,
    },
  }
}
