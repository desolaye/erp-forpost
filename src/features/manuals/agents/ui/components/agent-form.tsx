import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form'

import { AgentValidatorType } from '@/entities/manuals'
import { useAgentForm } from '../../lib/use-agent-form'

interface IAgentFormProps {
  id: string
  name: string
  onMutate: (data: AgentValidatorType) => void
  onClose: () => void
}

export const AgentForm = (props: IAgentFormProps) => {
  const { id, name, onMutate, onClose } = props

  const { register, errors, handleSubmit, onReset, onSubmit } = useAgentForm({
    name,
    onMutate,
    onClose,
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Input
        placeholder="Имя агента"
        label="Имя агента"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="submit" disabled={id !== 'new'} full>
          Сохранить
        </Button>
        <Button type="reset" full mode="secondary">
          Отменить
        </Button>
      </div>
    </Form>
  )
}
