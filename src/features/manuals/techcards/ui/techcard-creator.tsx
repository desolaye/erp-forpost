import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

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
    resolver: zodResolver(ZTechcardValidator),
  })

  const onSubmit: SubmitHandler<TechcardValidatorType> = (data) => {
    handlers.mutateAsync(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      <Button full mode="secondary">
        Создать карту
      </Button>
    </Form>
  )
}
