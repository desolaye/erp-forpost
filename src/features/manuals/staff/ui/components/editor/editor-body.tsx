import { Loader } from '@/shared/ui/loader'
import { FileAdd } from '@/shared/ui/file'

import { StaffValidatorType } from '@/entities/manuals'
import { File, FileType } from '@/entities/files'

import { StaffForm } from '../staff-form'

interface IEditorBodyProps {
  currentTab: string
  isLoading?: boolean
  staff?: StaffValidatorType
  files?: FileType[]
  form?: {
    isPending: boolean
    isError: boolean
  }
  roles?: { label: string; value: string }[]
  onClose?: () => void
  onMutate: (data: StaffValidatorType) => void
  onFileAdd: (file: File) => void
}

export const EditorBody = (props: IEditorBodyProps) => {
  const {
    onMutate,
    staff,
    form,
    isLoading,
    currentTab,
    files,
    roles,
    onClose,
    onFileAdd,
  } = props

  if (isLoading || !staff) return <Loader />

  if (currentTab === 'data') {
    return (
      <StaffForm
        staff={staff}
        roles={roles}
        form={form}
        onClose={() => onClose?.()}
        onMutate={onMutate}
      />
    )
  }

  if (currentTab === 'files') {
    return (
      <>
        <FileAdd onLoad={onFileAdd} />
        {files?.map((file) => (
          <File title={file.fileName} link={file.id} key={file.id} />
        ))}
      </>
    )
  }

  return null
}
