import Textarea from '@mui/joy/Textarea'

import { Form } from '@/shared/ui/form'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { Text } from '@/shared/ui/text'

import { ModalLayout } from '@/widgets/layouts/modal'
import { useNotificationCreator } from '../../lib/use-notification-creator'
import { JoyUiProvider } from '@/shared/lib/joy-ui-provider'

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
            <JoyUiProvider>
              <Textarea
                {...handlers.register('message')}
                placeholder="Ваше сообщение"
                minRows={4}
                variant="soft"
              />
            </JoyUiProvider>

            {values.errors.message && <Text>Введите текст сообщения</Text>}
          </Form>
        }
        header={<Text>Отправить уведомление</Text>}
      />
    </ModalLayout>
  )
}
