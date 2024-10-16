import { Controller } from 'react-hook-form'
import { Checkbox } from '@mui/material'

import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'

import { ProductValidatorType } from '@/entities/manuals'
import { useProductForm } from '../../lib/use-product-form'

interface IProductFormProps {
  data?: ProductValidatorType
  onMutate: (data: ProductValidatorType) => void
  onClose: () => void
}

export const ProductForm = (props: IProductFormProps) => {
  const { register, control, errors, handleSubmit, onReset, onSubmit } =
    useProductForm(props)

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={onReset} withButtons>
      <Input
        placeholder="Название продукта"
        label="Название продукта"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />
      <Controller
        name="purchased"
        control={control}
        render={({ field }) => (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Checkbox {...field} />
            <Text>Закупочный товар</Text>
          </div>
        )}
      />
    </Form>
  )
}
