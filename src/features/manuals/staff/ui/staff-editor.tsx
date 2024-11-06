import { ModalEditor } from '@/shared/ui/modal-editor'
import { StaffType } from '@/entities/manuals'

import { useStaffEditor } from '../lib/use-staff-editor'
import { EditorHeader } from './components/editor/editor-header'
import { EditorBody } from './components/editor/editor-body'

interface IStaffEditorProps {
  staff?: StaffType

  onClose?: () => void
}

export const StaffEditor = (props: IStaffEditorProps) => {
  const { staff, onClose } = props
  const { values, handlers } = useStaffEditor(props)

  return (
    <ModalEditor
      body={
        <EditorBody
          currentTab={values.tab}
          form={{ isError: values.isError, isPending: values.isPending }}
          onFileAdd={handlers.mutateFile}
          onMutate={handlers.onMutate}
          files={values.files}
          isLoading={values.isLoading || values.isPendingFile}
          onClose={onClose}
          roles={values.roles}
          staff={values.employee}
        />
      }
      header={
        <EditorHeader
          onTabChange={handlers.setTab}
          tab={values.tab}
          isNew={!Boolean(staff?.id) || staff?.id === 'new'}
        />
      }
    />
  )
}
