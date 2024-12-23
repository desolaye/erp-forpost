export const getInvoiceStatusesOptions = () => {
  return [
    { label: 'Создан', value: 100, color: '#6B7679' },
    { label: 'В работе', value: 200, color: '#FFA000' },
    { label: 'Отменен', value: 300, color: '#784380' },
    { label: 'Ожидает отгрузки', value: 400, color: '#B57627' },
    { label: 'Отгружен', value: 500, color: '#47797A' },
    { label: 'Завершен', value: 600, color: '#8C0B05' },
  ]
}
