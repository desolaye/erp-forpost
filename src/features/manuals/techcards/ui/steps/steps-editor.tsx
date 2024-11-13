import { ModalEditor } from '@/shared/ui/modal-editor'
import { Text } from '@/shared/ui/text'

import { useStepsEditor } from '../../lib/steps/use-steps-editor'
import { StepsEditorBody } from './components/steps-editor-body'

interface IStepsEditorProps {
  id: string
  onClose?: () => void
}

export const StepsEditor = (props: IStepsEditorProps) => {
  const { values, handlers } = useStepsEditor(props)

  return (
    <ModalEditor
      body={
        <StepsEditorBody
          isPending={values.isPending}
          isError={values.isError}
          onMutate={handlers.onMutate}
          operations={values.operations}
        />
      }
      header={
        <Text weight="semi" size="xl">
          Создание этапа
        </Text>
      }
    />
  )
}
