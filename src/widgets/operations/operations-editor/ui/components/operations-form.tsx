import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Select } from '@/shared/ui/select'

import {
  deleteOperationById,
  OperationType,
  postCreateOperation,
  putEditOperation,
} from '@/entities/manuals/operations'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { useCallback } from 'react'

type OperationsFormProps = {
  id: string
  operation?: OperationType
  onClose?: () => void
}

type OperationFormType = Omit<OperationType, 'type' | 'id' | 'description'> & {
  operationTypeValue: number
  description: string
}

const operType = (type?: number) => {
  if (type === 100) return 'Подготовительный'
  if (type === 200) return 'Базовый'
  return 'Выберите тип операции...'
}

export const OperationsForm = (props: OperationsFormProps) => {
  const { id, operation, onClose } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<OperationFormType>({
    defaultValues: {
      ...operation,
      operationTypeValue: operation?.type.value,
      description: operation?.description || '',
    },
  })

  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['operations_all'] })
    queryClient.invalidateQueries({ queryKey: ['operation_by_id', id] })
    onClose?.()
  }, [id])

  const queryClient = useQueryClient()

  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: id === 'new' ? postCreateOperation : putEditOperation,
    onSuccess,
  })

  const mutateDelete = useMutation({
    mutationFn: deleteOperationById,
    onSuccess,
  })

  const onSubmit: SubmitHandler<OperationFormType> = (data) => {
    mutateAsync({ ...data, id })
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => onClose?.()}
      withButtons
      saveDisabled={isPending || mutateDelete.isPending}
      pending={isPending || mutateDelete.isPending}
      error={isError || mutateDelete.isError}
      style={{ padding: 16 }}
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text size="lg" weight="semi">
          Редактирование операции
        </Text>

        {id !== 'new' && (
          <Button
            type="button"
            mode="secondary"
            onClick={() => mutateDelete.mutateAsync(id)}
          >
            Удалить
          </Button>
        )}
      </div>

      <Input
        placeholder="Название операции"
        label="Название операции"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            label="Описание операции"
            placeholder="Описание операции"
            errorMsg={errors.description?.message}
          />
        )}
      />

      <Controller
        name="operationTypeValue"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Тип операции"
            placeholder="Тип операции"
            errorMsg={errors.description?.message}
            onChange={(e) => field.onChange(e.value)}
            value={{
              label: operType(field.value),
              value: field.value,
            }}
            options={[
              { label: 'Подготовительный', value: 100 },
              { label: 'Базовый', value: 200 },
            ]}
          />
        )}
      />
    </Form>
  )
}
