import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { ProductType } from '@/entities/manuals'

export const productsTableConfig = () => {
  const config: TableRowRecordType<ProductType> = {
    name: {
      type: 'text',
      title: 'Название',
      width: 360,
    },
    categoryName: {
      type: 'text',
      title: 'Категория',
      width: 150,
    },
    purchased: {
      type: 'text',
      title: 'Закупочный товар',
      width: 0,
    },
    id: {
      type: 'text',
      title: 'id',
      width: 0,
    },
    categoryId: {
      type: 'text',
      title: 'cat_id',
      width: 0,
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<ProductType>
}
