export const contractTypeToText = (type: number) => {
  if (type === 0) return 'Отсутствует'
  if (type === 100) return 'Прямой клиент'
  if (type === 200) return 'Дилер'
  if (type === 300) return 'Партнер'
  if (type === 400) return 'Поставщик'
  if (type === 500) return 'Дистрибутор'
  if (type === 600) return 'Интегратор'
  if (type === 700) return 'Контрагент'
  if (type === 800) return 'Покупатель'

  return 'Неизвестный'
}
