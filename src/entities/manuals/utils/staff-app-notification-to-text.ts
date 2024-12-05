export const staffAppNotificationToText = (text: string) => {
  if (text === 'InvoiceCreated') return 'Создание счёта'
  return 'Неизвестное уведомление'
}
