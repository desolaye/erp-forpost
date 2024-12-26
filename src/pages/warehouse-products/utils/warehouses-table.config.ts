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
  }

  return Object.entries(config) as TableConfigType<ProductByWarehouseType>
}
