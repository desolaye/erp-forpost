import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'

import { AgentValidatorType } from '@/entities/manuals'
import { useAgentForm } from '../../lib/use-agent-form'

interface IAgentFormProps {
  id?: string
  name: string
  form?: {
    isPending: boolean
    isError: boolean
  }

  onMutate: (data: AgentValidatorType) => void
  onClose: () => void
}

export const AgentForm = (props: IAgentFormProps) => {
  const { id, form } = props

  const { register, errors, handleSubmit, onReset, onSubmit } = useAgentForm(props)

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      withButtons
      saveDisabled={id !== 'new'}
      pending={form?.isPending}
      error={form?.isError}
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
