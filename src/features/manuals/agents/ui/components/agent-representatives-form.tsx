import Textarea from '@mui/joy/Textarea'

import { JoyUiProvider } from '@/shared/lib/joy-ui-provider'
import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'

import {
  AgentRepresentativesType,
  AgentRepresentativesValidatorType,
} from '@/entities/manuals'

import { useAgentRepresentativesForm } from '../../lib/use-agent-representatives-form'

type AgentRepresentativesFormProps = {
  representative: AgentRepresentativesType
  isPending?: boolean
  isError?: boolean

  onMutate: (data: AgentRepresentativesValidatorType) => void
  onClose: () => void
}

export const AgentRepresentativesForm = (props: AgentRepresentativesFormProps) => {
  const { isPending, isError, onClose } = props
  const { register, errors, handleSubmit, onSubmit } = useAgentRepresentativesForm(props)

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
        placeholder="Имя представителя"
        label="Имя представителя"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />

      <Input
        placeholder="Должность представителя"
        label="Должность представителя"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('post')}
      />

      <Text>Описание представителя</Text>

      <JoyUiProvider>
        <Textarea
          {...register('description')}
          placeholder="Описание представителя"
          minRows={4}
          variant="soft"
          sx={{ fontFamily: 'Montserrat' }}
        />
      </JoyUiProvider>

      {errors.description && (
        <Text size="sm" color="error">
          {errors.description?.message}
        </Text>
      )}
    </Form>
  )
}
