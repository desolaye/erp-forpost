import { ModalEditor } from '@/shared/ui/modal-editor'

import { useAgentEditor } from '../lib/use-agent-editor'
import { EditorBody } from './components/editor/editor-body'
import { EditorHeader } from './components/editor/editor-header'

interface IAgentEditorProps {
  id?: string
  onClose?: () => void
}

export const AgentEditor = (props: IAgentEditorProps) => {
  const { id, onClose } = props
  const { values, handlers } = useAgentEditor(props)

  return (
    <ModalEditor
      body={
        <EditorBody
          currentTab={values.tab}
          onFileAdd={handlers.mutateFile}
          onMutate={handlers.onMutate}
          agent={values.agent}
          files={values.files}
          isFileLoading={values.isPendingFile}
          isLoading={values.isLoading}
          onClose={onClose}
        />
      }
      header={
        <EditorHeader
          onTabChange={handlers.setTab}
          tab={values.tab}
          isNew={id === 'new'}
        />
      }
    />
  )
}
