import { ModalEditor } from '@/shared/ui/modal-editor'
import { Loader } from '@/shared/ui/loader'
import { FileAdd } from '@/shared/ui/file'

import { File } from '@/entities/files'
import { ManualHeader } from '@/entities/manuals'

import { useAgentEditor } from '../lib/use-agent-editor'
import { AgentForm } from './agent-form'

interface IAgentEditorProps {
  id?: string
  onClose?: () => void
}

export const AgentEditor = (props: IAgentEditorProps) => {
  const { id, onClose } = props
  const { values, handlers } = useAgentEditor(props)

  if (values.isLoading) return <Loader />

  return (
    <ModalEditor
      header={
        <ManualHeader
          id={id || ''}
          onDelete={handlers.onDelete}
          setTab={handlers.setTab}
          tab={values.tab}
        />
      }
    >
      {values.tab === 'data' && (
        <AgentForm
          isPending={values.isPending}
          isError={values.isError}
          name={values.agent?.name || ''}
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
    </ModalEditor>
  )
}
