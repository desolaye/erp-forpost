import { Text } from '@/shared/ui/text'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { Loader } from '@/shared/ui/loader'

import { useProcessCreator } from '../lib/use-process-creator'
import { ProcessForm } from './components/process-form'

interface IProcessCreatorProps {
  onClose?: () => void
}

export const ProcessCreator = (props: IProcessCreatorProps) => {
  const { onClose } = props
  const { values, handlers } = useProcessCreator(props)

  return (
    <ModalEditor
      header={
        <Text size="lg" weight="semi">
          Планирование нового процесса
        </Text>
      }
      body={
        values.isPending || values.isLoading ? (
          <Loader />
        ) : (
          <ProcessForm
            staff={values.staff}
            steps={values.steps}
            techcards={values.techcards}
            onClose={onClose}
            onMutate={handlers.onMutate}
          />
        )
      }
    />
  )
}
