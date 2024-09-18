export const statusToText = (status: number) => {
  if (status === 100) return 'В ожидании'
  if (status === 101) return 'На паузе'
  if (status === 200) return 'Запущен'
  if (status === 300) return 'Выполнен'
  if (status === 400) return 'Отменен'
  return 'Неизвестно'
}
