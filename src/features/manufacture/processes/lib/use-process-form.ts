import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import {
  staffToOptions,
  StaffType,
  stepsToOptions,
  StepType,
  techcardsToOptions,
  TechcardType,
} from '@/entities/manuals'
import { ProcessValidatorType, ZProcessValidator } from '@/entities/manufacture'

interface IUseProcessForm {
  staff: StaffType[]
  steps: StepType[]
  techcards: TechcardType[]
  onMutate?: (data: ProcessValidatorType) => void
  onClose?: () => void
}

export const useProcessForm = (props: IUseProcessForm) => {
  const { staff, steps, techcards, onMutate, onClose } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProcessValidatorType>({
    resolver: zodResolver(
      ZProcessValidator.transform((data) => ({
        ...data,
        technologicalCardId: data.technologicalCardId.value,
        issues: data.issues.map((v) => ({
          ...v,
          stepId: v.stepId.value,
          responsibleId: v.responsibleId.value,
        })),
      })),
    ),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'issues',
  })

  const onSubmit: SubmitHandler<ProcessValidatorType> = (data) => {
    onMutate?.(data)
  }

  const onReset = onClose

  return {
    values: {
      errors,
      control,
      staff: staffToOptions(staff),
      steps: stepsToOptions(steps),
      techcards: techcardsToOptions(techcards),
      fields,
    },
    handlers: {
      register,
      handleSubmit,
      onSubmit,
      onReset,
      append,
      remove,
    },
  }
}
