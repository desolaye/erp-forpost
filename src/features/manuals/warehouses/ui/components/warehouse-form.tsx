import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

import { WarehouseValidatorType } from '@/entities/manuals'
import { useWarehouseForm } from '../../lib/use-warehouse-form'

interface IWarehouseFormProps {
  id: string
  name: string
  onMutate: (data: WarehouseValidatorType) => void
  onClose: () => void
}

export const WarehouseForm = (props: IWarehouseFormProps) => {
  const { id, name, onMutate, onClose } = props

  const { register, errors, handleSubmit, onReset, onSubmit } = useWarehouseForm({
    name,
    onMutate,
    onClose,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Input
        placeholder="Название склада"
        label="Название склада"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />
      <Button type="submit" disabled={id !== 'new'}>
        Сохранить
      </Button>
      <Button type="reset">Отменить</Button>
    </form>
  )
}
