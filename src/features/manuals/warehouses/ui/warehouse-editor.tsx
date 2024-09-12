import { Text } from '@/shared/ui/text'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { Loader } from '@/shared/ui/loader'

import { useWarehouseEditor } from '../lib/use-warehouse-editor'
import { WarehouseForm } from './components/warehouse-form'

interface IWarehouseEditorProps {
  id: string
  onClose?: () => void
}

export const WarehouseEditor = (props: IWarehouseEditorProps) => {
  const { id, onClose } = props
  const { values, handlers } = useWarehouseEditor(props)

  return (
    <ModalEditor
      body={
        values.isPending ? (
          <Loader />
        ) : (
          <WarehouseForm
            id={id}
            name={values.warehouse.name || ''}
            onClose={() => onClose?.()}
            onMutate={handlers.onMutate}
          />
        )
      }
      header={
        <Text size="lg" weight="semi">
          {id === 'new' ? 'Добавить' : 'Изменить'} склад
        </Text>
      }
    />
  )
}
