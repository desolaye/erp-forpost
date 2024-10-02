import { WarehouseType } from '@/entities/manuals'

export const warehousesTableConfig = () => {
  type DisplayValues = [
    keyof WarehouseType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<keyof WarehouseType, { size: string; title: string }> = {
    name: {
      size: '100%',
      title: 'Название склада',
    },
    id: {
      size: '0',
      title: '',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.size !== '0',
  ) as DisplayValues
}
