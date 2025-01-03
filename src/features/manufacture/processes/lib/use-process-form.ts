import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { staffToOptions, StaffType } from '@/entities/manuals'

import { ProcessValidatorType, ZProcessValidator } from '@/entities/manufacture'
import {
  getTechcardCompositionById,
  TechcardsAllResponseType,
} from '@/entities/manuals/techcards'

interface IUseProcessForm {
  staff: StaffType[]
  techcards?: TechcardsAllResponseType
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

  const { fields, remove } = useFieldArray({
    control,
    name: 'issues',
  })

  const id = watch('technologicalCardId')

  const { refetch } = useQuery({
    queryFn: () => getTechcardCompositionById(id?.value),
    queryKey: ['techcard_full', id?.value],
    enabled: false,
  })

  const onSubmit: SubmitHandler<ProcessValidatorType> = (data) => onMutate?.(data)

  useEffect(() => {
    if (id) {
      refetch().then(() => {
        remove()
      })
    }
  }, [id])

  return {
    values: {
      errors,
      control,
      staff: staffToOptions(staff),
      techcards: techcards?.items.map((v) => ({ label: v.number, value: v.id })),
      fields,
    },
    handlers: {
      register,
      handleSubmit,
      onSubmit,
    },
  }
}
