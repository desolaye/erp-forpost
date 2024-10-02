import { ProductByWarehouseType } from '@/entities/manuals'

export const warehouseProductsTableConfig = () => {
  type DisplayValues = [
    keyof ProductByWarehouseType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<keyof ProductByWarehouseType, { size: string; title: string }> = {
    productName: {
      size: '300px',
      title: 'Название продукта',
    },
    quantity: {
      size: '150px',
      title: 'Кол-во',
    },
    storageId: {
      size: '0',
      title: '',
    },
    productId: {
      size: '0',
      title: '',
    },
    storageName: {
      size: '0',
      title: '',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.size !== '0',
  ) as DisplayValues
}
