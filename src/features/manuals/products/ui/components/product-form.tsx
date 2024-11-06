import { Controller } from 'react-hook-form'
import { Checkbox } from '@mui/material'

import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'

import { ProductType, ProductValidatorType } from '@/entities/manuals'
import { useProductForm } from '../../lib/use-product-form'

interface IProductFormProps {
  data?: ProductType
  form?: {
    isPending: boolean
    isError: boolean
  }
  onMutate: (data: ProductValidatorType) => void
  onClose: () => void
}

export const ProductForm = (props: IProductFormProps) => {
  const { form } = props

  const { register, control, errors, handleSubmit, onReset, onSubmit } =
    useProductForm(props)

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      withButtons
      pending={form?.isPending}
      error={form?.isError}
    >
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
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Checkbox {...field} checked={field.value} />
            <Text>Закупочный товар</Text>
          </label>
        )}
      />
    </Form>
  )
}
