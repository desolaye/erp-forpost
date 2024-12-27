import { Form } from '@/shared/ui/form'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { Text } from '@/shared/ui/text'
import { ModalLayout } from '@/shared/ui/modal-layout'
import { Textarea } from '@/shared/ui/textarea'

import { useNotificationCreator } from '../lib/use-notification-creator'

interface INotificationCreatorProps {
  isOpen?: boolean
  onClose?: () => void
}

export const NotificationCreator = (props: INotificationCreatorProps) => {
  const { isOpen, onClose } = props
  const { handlers, values } = useNotificationCreator(props)

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <ModalEditor>
        <Form
          withButtons
          onSubmit={handlers.submit(handlers.onSubmit)}
          onReset={handlers.onReset}
        >
          <Text>Отправить уведомление</Text>
          <Textarea
            {...handlers.register('message')}
            errorMsg={values.errors.message && 'Введите текст сообщения'}
            placeholder="Ваше сообщение"
            label="Введите текст сообщения"
            minRows={5}
            maxRows={5}
          />
        </Form>
      </ModalEditor>
    </ModalLayout>
  )
}
