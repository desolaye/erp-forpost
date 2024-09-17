import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'

import { ItemValidatorType, ZItemValidator, ProductType } from '@/entities/manuals'

interface IItemsEditorBodyProps {
  products?: ProductType[]
  onMutate: (step: ItemValidatorType) => void
}

export const ItemsEditorBody = (props: IItemsEditorBodyProps) => {
  const { products, onMutate } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ItemValidatorType>({
    resolver: zodResolver(
      ZItemValidator.transform((data) => ({ ...data, productId: data.productId.value })),
    ),
  })

  const onSubmit: SubmitHandler<ItemValidatorType> = onMutate

  return (
    <Form onSubmit={handleSubmit(onSubmit)} withButtons>
      <Text>Выберите компонент</Text>
      <Controller
        name="productId"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={products?.map((v) => ({ label: v.name, value: v.id }))}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !errors.productId ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />
      {errors.productId && <Text color="error">Необходимо выбрать компонент</Text>}

      <Input
        placeholder="Количество компонентов"
        label="Количество компонентов"
        isError={Boolean(errors.quantity)}
        helper={errors.quantity?.message}
        {...register('quantity')}
      />
    </Form>
  )
}
