import { Text } from '@/shared/ui/text'
import { ModalEditor } from '@/shared/ui/modal-editor'

import { useWarehouseProductsCreator } from '../lib/use-warehouse-products-creator'
import { WarehouseProductsForm } from './warehouse-products-form'

interface IWarehouseProductsCreatorProps {
  warehouseId: string
  onClose?: () => void
}

export const WarehouseProductsCreator = (props: IWarehouseProductsCreatorProps) => {
  const { onClose } = props
  const { values, handlers } = useWarehouseProductsCreator(props)

  return (
    <ModalEditor
      body={
        <WarehouseProductsForm
          products={values.products}
          onClose={() => onClose?.()}
          onMutate={handlers.mutateAsync}
          onSearch={handlers.setSearch}
        />
      }
      header={
        <Text size="lg" weight="semi">
          Добавить продукт на склад
        </Text>
      }
    />
  )
}
