import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  AgentRepresentativesType,
  AgentRepresentativesValidatorType,
  ZAgentRepresentativesValidator,
} from '@/entities/manuals'

type UseAgentFormProps = {
  representative: AgentRepresentativesType
  onMutate: (data: AgentRepresentativesValidatorType) => void
}

export const useAgentRepresentativesForm = (props: UseAgentFormProps) => {
  const { representative, onMutate } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgentRepresentativesValidatorType>({
    resolver: zodResolver(ZAgentRepresentativesValidator),
    defaultValues: representative,
  })

  const onSubmit: SubmitHandler<AgentRepresentativesValidatorType> = onMutate

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  }
}
