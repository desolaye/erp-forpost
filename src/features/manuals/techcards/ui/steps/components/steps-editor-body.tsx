import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'

import { OperationType, StepValidatorType, ZStepValidator } from '@/entities/manuals'

interface IStepsEditorBodyProps {
  operations?: OperationType[]
  onMutate: (step: StepValidatorType) => void
}

export const StepsEditorBody = (props: IStepsEditorBodyProps) => {
  const { operations, onMutate } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<StepValidatorType>({
    resolver: zodResolver(
      ZStepValidator.transform((data) => ({
        ...data,
        operationId: data.operationId.value,
      })),
    ),
  })

  const onSubmit: SubmitHandler<StepValidatorType> = onMutate

  return (
    <Form onSubmit={handleSubmit(onSubmit)} withButtons>
      <Text>Выберите этап</Text>
      <Controller
        name="operationId"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={operations?.map((v) => ({ label: v.name, value: v.id }))}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !errors.operationId ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />

      {errors.operationId && <Text color="error">Необходимо выбрать этап</Text>}

      <Input
        placeholder="Описание операции"
        label="Описание операции"
        isError={Boolean(errors.description)}
        helper={errors.description?.message}
        {...register('description')}
      />
      <Input
        placeholder="Длительность операции"
        label="Длительность операции"
        isError={Boolean(errors.duration)}
        helper={errors.duration?.message}
        {...register('duration')}
      />
      <Input
        placeholder="Стоимость операции"
        label="Стоимость операции"
        isError={Boolean(errors.cost)}
        helper={errors.cost?.message}
        {...register('cost')}
      />
      <Input
        placeholder="Меры измерения операции"
        label="Меры измерения операции"
        isError={Boolean(errors.unitOfMeasure)}
        helper={errors.unitOfMeasure?.message}
        {...register('unitOfMeasure')}
      />
      <Input
        placeholder="Номер в очереди"
        label="Номер в очереди"
        isError={Boolean(errors.number)}
        helper={errors.number?.message}
        {...register('number')}
      />
    </Form>
  )
}
