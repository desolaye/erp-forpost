import { Text } from '@/shared/ui/text'

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
    <section>
      <header>
        <Text size="lg" weight="semi">
          {id === 'new' ? 'Добавить' : 'Изменить'} контрагента
        </Text>
      </header>
      <main>
        {values.isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <AgentForm
            id={id}
            name={values.agent?.data.name || ''}
            onClose={() => onClose?.()}
            onMutate={handlers.onMutate}
          />
        )}
      </main>
    </section>
  )
}
