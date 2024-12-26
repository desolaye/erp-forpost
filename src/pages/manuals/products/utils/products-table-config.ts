import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { ProductType } from '@/entities/manuals'

export const productsTableConfig = () => {
  const config: TableRowRecordType<ProductType> = {
    name: {
      type: 'text',
      title: 'Название',
    },
    categoryName: {
      type: 'text',
      title: 'Категория',
    },
  }

  return Object.entries(config) as TableConfigType<ProductType>
}
