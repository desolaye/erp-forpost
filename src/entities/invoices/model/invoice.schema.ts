import { z } from 'zod'
import { isoToTime } from '@/shared/utils/iso-to-time'
import { statusToText } from '@/shared/utils/status-to-text'

const ZInvoiceProduct = z.object({
  quantity: z.string(),

  productId: z.object({
    label: z.string(),
    value: z.string().uuid(),
  }),
})

const ZInvoice = z.object({
  id: z.string().uuid(),
  contragentId: z.string().uuid().optional(),

  contractorName: z.string(),
  description: z.string(),
  number: z.string(),

  paymentPercentage: z.number(),
  daysShipment: z.number(),
  dateShipment: z.string().nullable(),

  status: z.object({
    value: z.number(),
    name: z.string(),
  }),
})

export const ZInvoiceResponse = z
  .object({ invoices: z.array(ZInvoice), totalCount: z.number() })
  .transform((data) => ({
    ...data,
    invoices: data.invoices.map((invoice) => ({
      ...invoice,
      dateShipment: isoToTime(invoice.dateShipment),
      status: statusToText(invoice.status.value),
    })),
  }))

export const ZInvoiceValidator = z.object({
  number: z.string(),
  description: z.string(),

  daysShipment: z.string().regex(/[0-9]+/gi),
  paymentPercentage: z.string().regex(/[0-9]+/gi),

  contragentId: z.object({
    label: z.string(),
    value: z.string().uuid(),
  }),

  products: z.array(ZInvoiceProduct),
})

export const ZInvoiceToBack = ZInvoiceValidator.transform((data) => ({
  ...data,
  contragentId: data.contragentId.value,
  products: data.products.map((pr) => ({ ...pr, productId: pr.productId.value })),
}))

export type InvoiceType = z.infer<typeof ZInvoice>
export type InvoiceResponseType = z.infer<typeof ZInvoiceResponse>
export type InvoiceValidatorType = z.infer<typeof ZInvoiceValidator>
