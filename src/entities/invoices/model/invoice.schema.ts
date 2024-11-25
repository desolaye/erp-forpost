import { z } from 'zod'
import { isoToTime } from '@/shared/utils/iso-to-time'
import { invoiceStatusToText } from '../utils/invoice-status-to-text'
import { paymentStatusToText } from '../utils/payment-status-to-text'
import { priorityStatusToText } from '../utils/priority-status-to-text'

enum PriorityEnum { // Приоритет счёта
  low = 100, // Низкий
  normal = 200, // Средний
  high = 300, // Высокий
}

enum PaymentStatusEnum { // Статус оплаты
  notPaid = 100, // Не оплачен
  advancePaid = 200, // Аванс
  paidFull = 300, // Полная оплата
}

// enum InvoiceStatusEnum {
//   created = 100, // Создан
//   executed = 200, // В работе
//   declined = 300, // Отменен
//   awaitShipment = 400, // Ожидает отгрузки
//   shipped = 500, // Отгружен
//   completed = 600, // Завершен
// }

const ZPriorityEnum = z.nativeEnum(PriorityEnum)
const ZPaymentStatusEnum = z.nativeEnum(PaymentStatusEnum)
// const ZInvoiceStatusEnum = z.nativeEnum(InvoiceStatusEnum)

const ZInvoiceProduct = z.object({
  quantity: z.string(),

  productId: z.object({
    label: z.string(),
    value: z.string().uuid(),
  }),
})

const ZInvoiceProductResponse = z.object({
  invoiceId: z.string().uuid(),
  productId: z.string().uuid(),
  name: z.string(),
  quantity: z.number(),
})

const ZInvoice = z.object({
  id: z.string().uuid(),
  contractorId: z.string().uuid().optional(),

  contragentName: z.string(),
  description: z.string(),
  number: z.string(),
  paymentPercentage: z.number(),

  invoiceStatus: z.object({
    value: z.number(),
    name: z.string(),
  }),

  paymentStatus: z.object({
    value: z.number(),
    name: z.string(),
  }),

  priority: z.object({
    value: z.number(),
    name: z.string(),
  }),

  createdAt: z.string(),
  paymentDeadline: z.string(),
  dateClosing: z.string().nullable(),
  dateShipment: z.string().nullable(),
})

export const ZInvoiceResponse = z
  .object({ items: z.array(ZInvoice), totalCount: z.number() })
  .transform((data) => ({
    ...data,
    items: data.items.map((inv) => ({
      ...inv,
      invoiceStatus: invoiceStatusToText(inv.invoiceStatus.value),
      paymentStatus: paymentStatusToText(inv.paymentStatus.value),
      priority: priorityStatusToText(inv.priority.value),
      dateShipment: isoToTime(inv.dateShipment),
      dateClosing: isoToTime(inv.dateClosing),
      paymentDeadline: isoToTime(inv.paymentDeadline),
      createdAt: isoToTime(inv.createdAt),
    })),
  }))

export const ZInvoiceValidator = z.object({
  number: z.string().min(3, 'Минимум 3 символа'),
  description: z.string(),

  paymentDeadline: z.string(),

  priority: z.object({
    label: z.string(),
    value: ZPriorityEnum,
  }),

  paymentStatus: z.object({
    label: z.string(),
    value: ZPaymentStatusEnum,
  }),

  contractorId: z.object({
    label: z.string(),
    value: z.string().uuid(),
  }),

  products: z.array(ZInvoiceProduct),
})

export const ZInvoiceToBack = ZInvoiceValidator.transform((data) => ({
  ...data,

  contractorId: data.contractorId.value,
  priority: data.priority.value,
  paymentStatus: data.paymentStatus.value,

  products: data.products.map((pr) => ({
    quantity: Number(pr.quantity),
    productId: pr.productId.value,
  })),
}))

const ZInvoiceHistory = z.object({
  id: z.string().uuid(),
  entityId: z.string().uuid(),
  entityName: z.string(),

  propertyName: z.string(),
  value: z.string(),

  updatedAt: z.string(),
  updatedByName: z.string(),
})

export const ZInvoiceHistoryResponse = z
  .object({ items: z.array(ZInvoiceHistory), totalCount: z.number() })
  .transform((data) => ({
    ...data,
    items: data.items.map((inv) => ({
      ...inv,
      value: Number(inv.value),
      updatedAt: isoToTime(inv.updatedAt, true),
    })),
  }))

export type InvoiceType = z.infer<typeof ZInvoice>
export type InvoiceHistoryType = z.infer<typeof ZInvoiceHistory>

export type InvoiceProductResponseType = z.infer<typeof ZInvoiceProductResponse>
export type InvoiceHistoryResponseType = z.infer<typeof ZInvoiceHistoryResponse>
export type InvoiceResponseType = z.infer<typeof ZInvoiceResponse>

export type InvoiceValidatorType = z.infer<typeof ZInvoiceValidator>
export type InvoiceToBackType = z.infer<typeof ZInvoiceToBack>
