import { Loader } from '@/shared/ui/loader'
import { FileAdd } from '@/shared/ui/file'

import { AgentType, AgentValidatorType } from '@/entities/manuals'
import { File, FileType } from '@/entities/files'

import { AgentForm } from '../agent-form'

interface IEditorBodyProps {
  currentTab: string
  isLoading?: boolean
  isFileLoading?: boolean
  agent?: AgentType
  files?: FileType[]
  onClose?: () => void
  onMutate: (data: AgentValidatorType) => void
  onFileAdd: (file: File) => void
}

export const EditorBody = (props: IEditorBodyProps) => {
  const {
    onMutate,
    agent,
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
      <AgentForm
        id={agent?.id || 'new'}
        name={agent?.name || ''}
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
