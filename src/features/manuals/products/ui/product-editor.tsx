import { Text } from '@/shared/ui/text'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { Loader } from '@/shared/ui/loader'

import { useProductEditor } from '../lib/use-product-editor'
import { ProductForm } from './components/product-form'

interface IProductEditorProps {
  id: string
  onClose?: () => void
}

export const ProductEditor = (props: IProductEditorProps) => {
  const { id, onClose } = props
  const { values, handlers } = useProductEditor(props)

  return (
    <ModalEditor
      body={
        values.isLoading ? (
          <Loader />
        ) : (
          <ProductForm
            data={values.product}
            onClose={() => onClose?.()}
            onMutate={handlers.onMutate}
          />
        )
      }
      header={
        <Text size="lg" weight="semi">
          {id === 'new' ? 'Добавить' : 'Изменить'} продукт
        </Text>
      }
    />
  )
}
