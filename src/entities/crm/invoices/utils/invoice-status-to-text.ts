export const invoiceStatusToText = (status: number) => {
  if (status === 100) return 'Создан'
  if (status === 200) return 'В работе'
  if (status === 300) return 'Отменен'
  if (status === 400) return 'Ожидает отгрузки'
  if (status === 500) return 'Отгружен'
  if (status === 600) return 'Завершен'

  return 'Неизвестный статус'
}
