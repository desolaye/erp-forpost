import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { InvoiceValidatorType, ZInvoiceToBack } from '@/entities/crm/invoices'
import { useState } from 'react'

interface IUseInvoiceForm {
  onMutate?: (data: InvoiceValidatorType) => void
}

export const useInvoiceForm = (props: IUseInvoiceForm) => {
  const { onMutate } = props

  const [tab, setTab] = useState('data')

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<InvoiceValidatorType>({
    resolver: zodResolver(ZInvoiceToBack),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  })

  const createField = () =>
    append({ productId: { label: 'Выберите продукт...', value: '' }, quantity: '' })
  const removeField = (index?: number) => remove(index)

  const onSubmit: SubmitHandler<InvoiceValidatorType> = (data) => onMutate?.(data)

  return {
    values: {
      errors,
      fields,
      control,
      tab,
    },
    handlers: {
      register,
      handleSubmit,
      createField,
      removeField,
      setTab,
      onSubmit,
    },
  }
}
