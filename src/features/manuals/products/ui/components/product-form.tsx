import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'

import { ProductValidatorType } from '@/entities/manuals'
import { useProductForm } from '../../lib/use-product-form'

interface IProductFormProps {
  data?: ProductValidatorType
  onMutate: (data: ProductValidatorType) => void
  onClose: () => void
}

export const ProductForm = (props: IProductFormProps) => {
  const { data, onMutate, onClose } = props

  const { register, errors, handleSubmit, onReset, onSubmit } = useProductForm({
    data,
    onMutate,
    onClose,
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={onReset} withButtons>
      <Input
        placeholder="Название продукта"
        label="Название продукта"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />
    </Form>
  )
}
