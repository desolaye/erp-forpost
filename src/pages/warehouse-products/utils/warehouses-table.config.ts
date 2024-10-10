import { ProductByWarehouseType } from '@/entities/manuals'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const warehouseProductsTableConfig = () => {
  const config: TableRowRecordType<ProductByWarehouseType> = {
    productName: {
      width: 300,
      title: 'Название продукта',
      type: 'text',
    },
    quantity: {
      width: 150,
      title: 'Кол-во',
      type: 'text',
    },
    storageId: {
      width: 0,
      title: '',
      type: 'text',
    },
    productId: {
      width: 0,
      title: '',
      type: 'text',
    },
    storageName: {
      width: 0,
      title: '',
      type: 'text',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<ProductByWarehouseType>
}
