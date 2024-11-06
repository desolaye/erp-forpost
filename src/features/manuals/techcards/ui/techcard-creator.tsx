import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'
import { Input } from '@/shared/ui/input'

import { TechcardValidatorType, ZTechcardValidator } from '@/entities/manuals'
import { useTechcardCreator } from '../lib/use-techcard-creator'

interface ITechcardCreatorProps {
  onModal?: () => void
}

export const TechcardCreator = (props: ITechcardCreatorProps) => {
  const { onModal } = props
  const { values, handlers } = useTechcardCreator({ onClose: onModal })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TechcardValidatorType>({
    resolver: zodResolver(
      ZTechcardValidator.transform((data) => ({
        ...data,
        productId: data.productId.value,
      })),
    ),
  })

  const onSubmit: SubmitHandler<TechcardValidatorType> = (data) => {
    handlers.mutateAsync(data)
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      withButtons
      onReset={onModal}
      pending={values.isPendingCreation}
      error={values.isError}
    >
      <Text>Выберите создаваемый продукт</Text>

      <Controller
        name="productId"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={values.items?.map((v) => ({ label: v.name, value: v.id }))}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !errors.productId ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />

      {errors.productId && <Text color="error">Необходимо выбрать продукт</Text>}

      <Input
        placeholder="Номер техкарты"
        label="Номер техкарты"
        isError={Boolean(errors.number)}
        helper={errors.number?.message}
        {...register('number')}
      />
      <Input
        placeholder="Описание техкарты"
        label="Описание техкарты"
        isError={Boolean(errors.description)}
        helper={errors.description?.message}
        {...register('description')}
      />
    </Form>
  )
}
