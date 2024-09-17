import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AgentValidatorType, ZAgentValidator } from '@/entities/manuals'

interface IUseAgentForm {
  name: string
  onMutate: (data: AgentValidatorType) => void
  onClose: () => void
}

export const useAgentForm = (props: IUseAgentForm) => {
  const { name, onMutate, onClose } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgentValidatorType>({
    resolver: zodResolver(ZAgentValidator),
    defaultValues: { name },
  })

  const onSubmit: SubmitHandler<AgentValidatorType> = onMutate
  const onReset = onClose

  return {
    register,
    handleSubmit,
    onSubmit,
    onReset,
    errors,
  }
}
