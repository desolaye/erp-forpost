import { Text } from '@/shared/ui/text'

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
    <section>
      <header>
        <Text size="lg" weight="semi">
          {id === 'new' ? 'Добавить' : 'Изменить'} продукт
        </Text>
      </header>

      <main>
        {values.isLoading && <Text>Loading...</Text>}
        {!values.isLoading && (
          <ProductForm
            data={values.product}
            onClose={() => onClose?.()}
            onMutate={handlers.onMutate}
          />
        )}
      </main>
    </section>
  )
}
