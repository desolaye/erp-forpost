import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

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
    <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Input
        placeholder="Название продукта"
        label="Название продукта"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />
      <Button type="submit">Сохранить</Button>
      <Button type="reset">Отменить</Button>
    </form>
  )
}
