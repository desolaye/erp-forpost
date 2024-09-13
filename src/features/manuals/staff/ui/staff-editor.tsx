import { Text } from '@/shared/ui/text'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { Loader } from '@/shared/ui/loader'

import { useStaffEditor } from '../lib/use-staff-editor'
import { StaffForm } from './components/staff-form'

interface IStaffEditorProps {
  id: string
  onClose?: () => void
}

export const StaffEditor = (props: IStaffEditorProps) => {
  const { id, onClose } = props
  const { values, handlers } = useStaffEditor(props)

  return (
    <ModalEditor
      body={
        values.isPending ? (
          <Loader />
        ) : (
          <StaffForm
            id={id}
            roles={values.roles}
            onClose={() => onClose?.()}
            onMutate={handlers.onMutate}
          />
        )
      }
      header={
        <Text size="lg" weight="semi">
          Добавить сотрудника
        </Text>
      }
    />
  )
}
