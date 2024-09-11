import { Text } from '@/shared/ui/text'

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
    <section>
      <header>
        <Text size="lg" weight="semi">
          {id === 'new' ? 'Добавить' : 'Изменить'} склад
        </Text>
      </header>
      <main>
        {values.isPending && <Text>Loading...</Text>}
        {!values.isPending && (
          <WarehouseForm
            id={id}
            name={values.warehouse.name || ''}
            onClose={() => onClose?.()}
            onMutate={handlers.onMutate}
          />
        )}
      </main>
    </section>
  )
}
