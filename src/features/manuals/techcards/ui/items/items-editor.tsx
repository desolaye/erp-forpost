import { ModalEditor } from '@/shared/ui/modal-editor'
import { Text } from '@/shared/ui/text'

import { useItemsEditor } from '../../lib/items/use-items-editor'
import { ItemsEditorBody } from './components/items-editor-body'

interface IItemsEditorProps {
  id: string
  onClose?: () => void
}

export const ItemsEditor = (props: IItemsEditorProps) => {
  const { values, handlers } = useItemsEditor(props)

  return (
    <ModalEditor
      body={<ItemsEditorBody onMutate={handlers.mutateAsync} products={values.items} />}
      header={
        <Text weight="semi" size="xl">
          Добавление компонента
        </Text>
      }
    />
  )
}
