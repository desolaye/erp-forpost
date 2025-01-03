import { ModalEditor } from '@/shared/ui/modal-editor'
import { Loader } from '@/shared/ui/loader'
import { FileAdd } from '@/shared/ui/file'

import { File } from '@/entities/files'
import { ManualHeader, StaffType } from '@/entities/manuals'

import { useStaffEditor } from '../lib/use-staff-editor'

import { StaffForm } from './components/staff-form'
import { PasswordForm } from './components/password-form'
import { UserNotificationsTab } from './components/user-notifications-tab'

interface IStaffEditorProps {
  staff?: StaffType
  onClose?: () => void
}

export const StaffEditor = (props: IStaffEditorProps) => {
  const { staff, onClose } = props

  const { values, handlers } = useStaffEditor(props)

  if (values.isLoading) return <Loader />

  return (
    <ModalEditor
      header={
        <ManualHeader
          id={staff?.id || 'new'}
          onDelete={handlers.onDelete}
          setTab={handlers.setTab}
          tab={values.tab}
          tabs={values.tabList}
        />
      }
    >
      {values.tab === 'data' && (
        <StaffForm
          staff={values.employee}
          roles={values.roles}
          isError={values.isError}
          isPending={values.isMutateLoading}
          onClose={() => onClose?.()}
          onMutate={handlers.onMutate}
        />
      )}

      {values.tab === 'files' && (
        <>
          <FileAdd onLoad={handlers.mutateFile} />
          {values.files?.map((file) => (
            <File title={file.fileName} link={file.id} key={file.id} />
          ))}
        </>
      )}

      {values.tab === 'password' && (
        <PasswordForm onClose={() => onClose?.()} staffId={staff?.id || 'new'} />
      )}

      {values.tab === 'notifications' && (
        <UserNotificationsTab userId={staff?.id || ''} />
      )}
    </ModalEditor>
  )
}
