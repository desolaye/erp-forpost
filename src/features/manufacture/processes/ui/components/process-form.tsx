import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'
import { Checkbox } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import dayjs from 'dayjs'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Card } from '@/shared/ui/card'

import { StaffType, TechcardType } from '@/entities/manuals'
import { ProcessValidatorType } from '@/entities/manufacture'

import { useProcessForm } from '../../lib/use-process-form'

interface IProcessFormProps {
  staff: StaffType[]
  techcards: TechcardType[]
  onClose?: () => void
  onMutate?: (data: ProcessValidatorType) => void
  onTechcardSearch: (value: string) => void
  onStaffSearch: (value: string) => void
}

export const ProcessForm = (props: IProcessFormProps) => {
  const { onStaffSearch, onTechcardSearch } = props
  const { handlers, values } = useProcessForm(props)

  return (
    <Form
      withButtons
      onSubmit={handlers.handleSubmit(handlers.onSubmit)}
      onReset={() => props.onClose?.()}
    >
      <Text>Выбор тех карты</Text>
      <Controller
        name="technologicalCardId"
        control={values.control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={values.techcards}
            onInputChange={onTechcardSearch}
            placeholder={'Поиск по номеру'}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !values.errors.technologicalCardId ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />
      {values.errors.technologicalCardId && (
        <Text size="sm" color="error">
          Необходимо выбрать тех карту
        </Text>
      )}

      <Input
        placeholder="Номер партии"
        label="Номер партии"
        isError={Boolean(values.errors.batchNumber)}
        helper={values.errors.batchNumber?.message}
        {...handlers.register('batchNumber')}
      />

      <Input
        placeholder="Требуемое количество"
        label="Требуемое количество"
        isError={Boolean(values.errors.targetQuantity)}
        helper={values.errors.targetQuantity?.message}
        {...handlers.register('targetQuantity')}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <Text>Выбор времени начала</Text>
        <Controller
          name="startTime"
          control={values.control}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              onChange={(v) => field.onChange(dayjs(v).toISOString())}
              defaultValue={dayjs()}
              value={dayjs(field.value)}
            />
          )}
        />
        {values.errors.startTime && (
          <Text size="sm" color="error">
            Необходимо выбрать время начала
          </Text>
        )}
      </LocalizationProvider>

      {values.fields.map((f, i) => (
        <Card key={f.id}>
          <Text weight="semi">Задача №{i + 1}</Text>

          <Text>Этап - {f.stepId.label}</Text>

          <Text>Выбор ответственного</Text>
          <Controller
            name={`issues.${i}.responsibleId`}
            control={values.control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                onInputChange={onStaffSearch}
                placeholder={'Поиск по фамилии'}
                options={values.staff}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: !values.errors.issues?.[i]?.responsibleId
                      ? 'grey'
                      : '#830000',
                  }),
                }}
              />
            )}
          />

          {values.errors.issues?.[i]?.responsibleId && (
            <Text size="sm" color="error">
              Необходимо выбрать ответственного
            </Text>
          )}

          <Input
            placeholder="Описание задачи"
            label="Описание задачи"
            isError={Boolean(values.errors.issues?.[i]?.description)}
            {...handlers.register(`issues.${i}.description` as const)}
          />

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Controller
              name={`issues.${i}.productCompositionSettingFlag`}
              control={values.control}
              render={({ field }) => <Checkbox {...field} />}
            />
            <Text>Проверка состава продукта</Text>
          </div>
        </Card>
      ))}
    </Form>
  )
}
