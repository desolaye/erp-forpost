import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'

import { AgentType, AgentValidatorType, contractTypeToOptions } from '@/entities/manuals'
import { useAgentForm } from '../lib/use-agent-form'
import { JoyUiProvider } from '@/shared/lib/joy-ui-provider'
import Textarea from '@mui/joy/Textarea'
import { Slider } from '@mui/material'

interface IAgentFormProps {
  agent?: AgentType
  isPending?: boolean
  isError?: boolean

  onMutate: (data: AgentValidatorType) => void
  onClose: () => void
}

export const AgentForm = (props: IAgentFormProps) => {
  const { isPending, isError, onClose } = props
  const { register, errors, control, handleSubmit, onSubmit } = useAgentForm(props)

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => onClose()}
      withButtons
      saveDisabled={isPending}
      pending={isPending}
      error={isError}
    >
      <Input
        placeholder="Имя агента"
        label="Имя агента"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />
      <Input
        placeholder="ИНН"
        label="ИНН"
        isError={Boolean(errors.inn)}
        helper={errors.inn?.message}
        {...register('inn')}
      />

      <Text>Тип контрагента</Text>
      <Controller
        name="contractorType"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={contractTypeToOptions()}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !errors.contractorType ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />
      {errors.contractorType && (
        <Text size="sm" color="error">
          Необходимо выбрать тип агента
        </Text>
      )}

      <Text>Страна</Text>
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={[
              { label: 'Россия', value: 'Россия' },
              { label: 'Казахстан', value: 'Казахстан' },
              { label: 'Белорусь', value: 'Белорусь' },
              { label: 'Иное', value: 'Иное' },
            ]}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !errors.country ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />
      {errors.country && (
        <Text size="sm" color="error">
          Необходимо выбрать страну
        </Text>
      )}

      <Input
        placeholder="Город"
        label="Город"
        isError={Boolean(errors.city)}
        helper={errors.city?.message}
        {...register('city')}
      />

      <Text>Процент скидки</Text>
      <Controller
        name="discountLevel"
        control={control}
        render={({ field }) => (
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Slider {...field} />
            <Text color="error" weight="semi" style={{ minWidth: '42px' }}>
              {field.value}%
            </Text>
          </div>
        )}
      />
      {errors.discountLevel && (
        <Text size="sm" color="error">
          {errors.discountLevel?.message}
        </Text>
      )}

      <Text>Описание агента</Text>
      <JoyUiProvider>
        <Textarea
          {...register('description')}
          placeholder="Описание агента"
          minRows={3}
          maxRows={3}
          variant="soft"
          sx={{ fontFamily: 'Montserrat' }}
        />
      </JoyUiProvider>
      {errors.description && (
        <Text size="sm" color="error">
          {errors.description?.message}
        </Text>
      )}

      <Text>Заметки по логистике</Text>
      <JoyUiProvider>
        <Textarea
          {...register('logisticInfo')}
          placeholder="Заметки по логистике"
          minRows={3}
          maxRows={3}
          variant="soft"
          sx={{ fontFamily: 'Montserrat' }}
        />
      </JoyUiProvider>
      {errors.logisticInfo && (
        <Text size="sm" color="error">
          {errors.logisticInfo?.message}
        </Text>
      )}
    </Form>
  )
}
