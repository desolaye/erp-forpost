import { Form } from '@/shared/ui/form'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { Text } from '@/shared/ui/text'
import { Input } from '@/shared/ui/input'

import { ModalLayout } from '@/widgets/layouts/modal'
import { useNotificationCreator } from '../../lib/use-notification-creator'

interface INotificationCreatorProps {
  isOpen?: boolean
  onClose?: () => void
}

export const NotificationCreator = (props: INotificationCreatorProps) => {
  const { isOpen, onClose } = props
  const { handlers, values } = useNotificationCreator(props)

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <ModalEditor
        body={
          <Form
            withButtons
            onSubmit={handlers.submit(handlers.onSubmit)}
            onReset={handlers.onReset}
          >
            <Input
              placeholder="Ваше сообщение"
              label="Ваше сообщение"
              isError={Boolean(values.errors.message)}
              helper={values.errors.message?.message}
              {...handlers.register('message')}
            />
          </Form>
        }
        header={<Text>Отправить уведомление</Text>}
      />
    </ModalLayout>
  )
}
