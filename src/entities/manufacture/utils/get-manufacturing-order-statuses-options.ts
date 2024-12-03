export const getManufacturingOrderOptions = () => {
  return [
    { label: 'Ожидает', value: 100 },
    { label: 'В работе', value: 200 },
    { label: 'Отменен', value: 300 },
    { label: 'Ожидает отгрузки', value: 400 },
    { label: 'Отгружен', value: 500 },
    { label: 'Завершен', value: 600 },
  ]
}
