import { Controller } from 'react-hook-form'
import { Slider } from '@mui/material'

import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'
import { Textarea } from '@/shared/ui/textarea'
import { Select } from '@/shared/ui/select'

import { AgentType, AgentValidatorType, contractTypeToOptions } from '@/entities/manuals'
import { useAgentForm } from '../lib/use-agent-form'

interface IAgentFormProps {
  agent?: AgentType
  isPending?: boolean
  isError?: boolean

  onMutate: (data: AgentValidatorType) => void
}

export const AgentForm = (props: IAgentFormProps) => {
  const { isPending, isError } = props

  const { register, errors, control, handleSubmit, onSubmit, onClose } =
    useAgentForm(props)

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => onClose?.()}
      withButtons
      saveDisabled={isPending}
      pending={isPending}
      error={isError}
    >
      <div style={{ display: 'flex', gap: 8 }}>
        <Input
          placeholder="Имя агента"
          label="Имя агента"
          isError={Boolean(errors.name)}
          helper={errors.name?.message}
          style={{ minWidth: 0 }}
          {...register('name')}
        />
        <Input
          placeholder="ИНН"
          label="ИНН"
          isError={Boolean(errors.inn)}
          helper={errors.inn?.message}
          style={{ minWidth: 0 }}
          {...register('inn')}
        />
        <Controller
          name="contractorType"
          control={control}
          render={({ field }) => (
            <Select
              errorMsg={errors.contractorType && 'Выберите тип агента'}
              label="Тип контрагента"
              placeholder="Тип контрагента"
              className="full"
              {...field}
              options={contractTypeToOptions()}
            />
          )}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              errorMsg={errors.country && 'Выберите страну'}
              placeholder="Страна"
              label="Страна"
              className="full"
              options={[
                { label: 'Россия', value: 'Россия' },
                { label: 'Казахстан', value: 'Казахстан' },
                { label: 'Белорусь', value: 'Белорусь' },
                { label: 'Другая', value: 'Другая' },
              ]}
            />
          )}
        />

        <Input
          placeholder="Город"
          label="Город"
          isError={Boolean(errors.city)}
          helper={errors.city?.message}
          {...register('city')}
        />
      </div>

      <Text>Уровень дисконта</Text>
      <Controller
        name="discountLevel"
        control={control}
        render={({ field }) => (
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Slider {...field} />
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <Input {...field} style={{ minWidth: '65px', maxWidth: '65px' }} />
              <Text>%</Text>
            </div>
          </div>
        )}
      />
      {errors.discountLevel && (
        <Text size="sm" color="error">
          {errors.discountLevel?.message}
        </Text>
      )}

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            errorMsg={errors.description?.message}
            placeholder="Описание агента"
            label="Описание агента"
          />
        )}
      />

      <Controller
        name="logisticInfo"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            errorMsg={errors.logisticInfo?.message}
            placeholder="Заметки по логистике"
            label="Заметки по логистике"
          />
        )}
      />
    </Form>
  )
}
