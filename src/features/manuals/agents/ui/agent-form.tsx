import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'

import { AgentValidatorType } from '@/entities/manuals'
import { useAgentForm } from '../lib/use-agent-form'
import { Text } from '@/shared/ui/text'

interface IAgentFormProps {
  name: string
  isPending?: boolean
  isError?: boolean
  onMutate: (data: AgentValidatorType) => void
  onClose: () => void
}

export const AgentForm = (props: IAgentFormProps) => {
  const { name, isPending, isError, onMutate, onClose } = props

  const { register, errors, handleSubmit, onReset, onSubmit } = useAgentForm({
    name,
    onMutate,
    onClose,
  })

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      withButtons
      saveDisabled={isPending}
    >
      <Input
        placeholder="Имя агента"
        label="Имя агента"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />

      {isPending && <Text pos="center">Отправляем форму...</Text>}
      {isError && (
        <Text pos="center" color="error">
          Ошибка обработки формы
        </Text>
      )}
    </Form>
  )
}
