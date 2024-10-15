import { ModalEditor } from '@/shared/ui/modal-editor'
import { StaffType } from '@/entities/manuals'

import { useStaffEditor } from '../lib/use-staff-editor'
import { EditorHeader } from './components/editor/editor-header'
import { EditorBody } from './components/editor/editor-body'

interface IStaffEditorProps {
  id: string
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
          onFileAdd={handlers.mutateFile}
          onMutate={handlers.onMutate}
          files={values.files}
          isFileLoading={values.isPendingFile}
          isLoading={values.isLoading}
          onClose={onClose}
          roles={values.roles}
          staff={staff}
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
