import { TechcardItemType } from '@/entities/manuals'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const getDisplayValuesItems = () => {
  const config: TableRowRecordType<TechcardItemType> = {
    productName: {
      width: 350,
      title: 'Название компонента',
      type: 'text',
    },
    quantity: {
      width: 100,
      title: 'Количество',
      type: 'text',
    },
    productId: {
      width: 0,
      title: '',
      type: 'text',
    },
    techCardId: {
      width: 0,
      title: '',
      type: 'text',
    },
    id: {
      width: 0,
      title: '',
      type: 'text',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<TechcardItemType>
}
