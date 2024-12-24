export const operationsTypeToText = (status?: number) => {
  if (status === 100) return 'Подготовительный'
  if (status === 200) return 'Базовый'
  return 'Неизвестный'
}
