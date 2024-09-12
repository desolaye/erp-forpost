import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
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
    <Form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Input
        placeholder="Название продукта"
        label="Название продукта"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="submit" full>
          Сохранить
        </Button>
        <Button type="reset" full mode="secondary">
          Отменить
        </Button>
      </div>
    </Form>
  )
}
