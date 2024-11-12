import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'

import { AgentValidatorType } from '@/entities/manuals'
import { useAgentForm } from '../lib/use-agent-form'

interface IAgentFormProps {
  name: string
  isPending?: boolean
  isError?: boolean
  onMutate: (data: AgentValidatorType) => void
  onClose: () => void
}

export const AgentForm = (props: IAgentFormProps) => {
  const { isPending, isError, onClose } = props
  const { register, errors, handleSubmit, onSubmit } = useAgentForm(props)

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => onClose()}
      withButtons
      saveDisabled={isPending}
      pending={isPending}
      error={isError}
    >
      <Input
        placeholder="Имя агента"
        label="Имя агента"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />
    </Form>
  )
}
