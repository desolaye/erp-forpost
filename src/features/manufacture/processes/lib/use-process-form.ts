import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import {
  getTechcardFull,
  staffToOptions,
  StaffType,
  techcardsToOptions,
  TechcardType,
} from '@/entities/manuals'

import { ProcessValidatorType, ZProcessValidator } from '@/entities/manufacture'

interface IUseProcessForm {
  staff: StaffType[]
  techcards: TechcardType[]
  onMutate?: (data: ProcessValidatorType) => void
}

export const useProcessForm = (props: IUseProcessForm) => {
  const { staff, techcards, onMutate } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
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

  const id = watch('technologicalCardId')

  const { refetch } = useQuery({
    queryFn: () => getTechcardFull(id?.value),
    queryKey: ['techcard_full', id?.value],
    enabled: false,
  })

  const onSubmit: SubmitHandler<ProcessValidatorType> = (data) => onMutate?.(data)

  useEffect(() => {
    if (id) {
      refetch().then(({ data }) => {
        remove()

        data?.data.steps.forEach((v) =>
          append({
            description: v.description || '',
            responsibleId: { label: '', value: '' },
            productCompositionSettingFlag: false,
            stepId: {
              label: `${v.description || 'Без описания'} - ${v.duration}`,
              value: v.id,
            },
          }),
        )
      })
    }
  }, [id])

  return {
    values: {
      errors,
      control,
      staff: staffToOptions(staff),
      techcards: techcardsToOptions(techcards),
      fields,
    },
    handlers: {
      register,
      handleSubmit,
      onSubmit,
    },
  }
}
