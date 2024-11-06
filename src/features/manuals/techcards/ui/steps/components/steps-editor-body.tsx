import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import 'dayjs/locale/de'
import dayjs from 'dayjs'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'

import { OperationType, StepValidatorType, ZStepValidator } from '@/entities/manuals'

import { modifyDuration } from '../../../utils/modify-duration'

interface IStepsEditorBodyProps {
  operations?: OperationType[]
  form?: {
    isPending: boolean
    isError: boolean
  }
  onMutate: (step: StepValidatorType) => void
}

export const StepsEditorBody = (props: IStepsEditorBodyProps) => {
  const { operations, form, onMutate } = props

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
        duration: modifyDuration(data.duration),
      })),
    ),
  })

  const onSubmit: SubmitHandler<StepValidatorType> = onMutate

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      withButtons
      pending={form?.isPending}
      error={form?.isError}
    >
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

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <Text>Длительность операции</Text>
        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <TimePicker
              {...field}
              views={['hours', 'minutes', 'seconds']}
              onChange={(v) => field.onChange(dayjs(v).toISOString())}
              value={field.value ? dayjs(field.value) : null}
            />
          )}
        />
      </LocalizationProvider>

      {errors.duration && (
        <Text size="sm" color="error">
          {errors.duration?.message}
        </Text>
      )}

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
