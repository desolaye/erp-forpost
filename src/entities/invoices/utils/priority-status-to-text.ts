export const priorityStatusToText = (status: number) => {
  if (status === 100) return 'Низкий'
  if (status === 200) return 'Средний'
  if (status === 300) return 'Высокий'

  return 'Неизвестный приоритет'
}
