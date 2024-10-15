import { Loader } from '@/shared/ui/loader'
import { File, FileAdd } from '@/shared/ui/file'

import { StaffType, StaffValidatorType } from '@/entities/manuals'
import { FileType } from '@/entities/files'

import { StaffForm } from '../staff-form'

interface IEditorBodyProps {
  currentTab: string
  isLoading?: boolean
  isFileLoading?: boolean
  staff?: StaffType
  files?: FileType[]
  roles?: { label: string; value: string }[]
  onClose?: () => void
  onMutate: (data: StaffValidatorType) => void
  onFileAdd: (file: File) => void
}

export const EditorBody = (props: IEditorBodyProps) => {
  const {
    onMutate,
    staff,
    isLoading,
    currentTab,
    isFileLoading,
    files,
    onClose,
    onFileAdd,
  } = props

  if (isLoading || isFileLoading) return <Loader />

  if (currentTab === 'data') {
    return (
      <StaffForm
        id={staff?.id || 'new'}
        staff={staff}
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
