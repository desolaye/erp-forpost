import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { ProductType } from '@/entities/manuals'

export const productsTableConfig = () => {
  const config: TableRowRecordType<ProductType> = {
    name: {
      type: 'text',
      title: 'Название продукта',
      width: 200,
    },
    cost: {
      type: 'text',
      title: 'Стоимость',
      width: 0,
    },
    purchased: {
      type: 'text',
      title: 'Закупочный товар',
      width: 0,
    },
    version: {
      type: 'text',
      title: 'Версия',
      width: 0,
    },
    id: {
      type: 'text',
      title: 'id',
      width: 0,
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<ProductType>
}
