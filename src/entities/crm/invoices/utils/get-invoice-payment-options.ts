export const getInvoicePaymentOptions = () => {
  return [
    { label: 'Не оплачен', value: 100 },
    { label: 'Аванс', value: 200 },
    { label: 'Полная оплата', value: 300 },
  ]
}
