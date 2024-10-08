import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { InvoiceValidatorType, ZInvoiceToBack } from '@/entities/invoices'

interface IUseInvoiceForm {
  onClose?: () => void
  onMutate?: (data: InvoiceValidatorType) => void
}

export const useInvoiceForm = (props: IUseInvoiceForm) => {
  const { onClose, onMutate } = props

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

  const createField = () => append({ productId: { label: '', value: '' }, quantity: '0' })
  const removeField = (index?: number) => remove(index)

  const onSubmit: SubmitHandler<InvoiceValidatorType> = (data) => onMutate?.(data)
  const onReset = onClose

  return {
    values: {
      errors,
      fields,
      control,
    },
    handlers: {
      register,
      handleSubmit,
      createField,
      removeField,
      onSubmit,
      onReset,
    },
  }
}
