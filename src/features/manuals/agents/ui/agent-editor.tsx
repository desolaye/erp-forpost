import { Text } from '@/shared/ui/text'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { Loader } from '@/shared/ui/loader'

import { useAgentEditor } from '../lib/use-agent-editor'
import { AgentForm } from './components/agent-form'

interface IAgentEditorProps {
  id: string
  onClose?: () => void
}

export const AgentEditor = (props: IAgentEditorProps) => {
  const { id, onClose } = props
  const { values, handlers } = useAgentEditor(props)

  return (
    <ModalEditor
      body={
        values.isLoading ? (
          <Loader />
        ) : (
          <AgentForm
            id={id}
            name={values.agent?.data.name || ''}
            onClose={() => onClose?.()}
            onMutate={handlers.onMutate}
          />
        )
      }
      header={
        <Text size="lg" weight="semi">
          {id === 'new' ? 'Добавить' : 'Изменить'} контрагента
        </Text>
      }
    />
  )
}
