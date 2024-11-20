export const paymentStatusToText = (status: number) => {
  if (status === 100) return 'Не оплачено'
  if (status === 200) return 'Аванс'
  if (status === 300) return 'Полная оплата'

  return 'Неизвестный статус'
}
