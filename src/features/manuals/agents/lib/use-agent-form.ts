import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  AgentType,
  AgentValidatorType,
  contractTypeToText,
  ZAgentValidator,
} from '@/entities/manuals'
import { useContext } from 'react'
import { ModalLayoutContext } from '@/shared/ui/modal-layout'

interface IUseAgentForm {
  agent?: AgentType
  onMutate: (data: AgentValidatorType) => void
}

export const useAgentForm = (props: IUseAgentForm) => {
  const { agent, onMutate } = props

  const { onClose } = useContext(ModalLayoutContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AgentValidatorType>({
    resolver: zodResolver(ZAgentValidator),
    defaultValues: {
      ...agent,
      country: agent?.country
        ? { label: agent.country, value: agent.country }
        : undefined,
      discountLevel: agent?.discountLevel || 0,
      city: agent?.city || '',
      contractorType: {
        label: contractTypeToText(agent?.contractorType.value),
        value: agent?.contractorType.value,
      },
      description: agent?.description || '',
      inn: agent?.inn || '',
      logisticInfo: agent?.logisticInfo || '',
    },
  })

  const onSubmit: SubmitHandler<AgentValidatorType> = onMutate

  return {
    register,
    handleSubmit,
    onSubmit,
    onClose,
    errors,
    control,
  }
}
