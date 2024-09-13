import { z } from 'zod'

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

export const ZStaff = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string(),
  post: z.string(),
  role: z.string().uuid(),
  email: z.string().email(),
  phoneNumber: z.string(),
})

export const ZStaffValidator = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  post: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z.string().regex(phoneRegex),

  role: z.object({
    value: z.string().uuid(),
    label: z.string(),
  }),
})

export const ZStaffResponse = z.object({
  employees: z.array(ZStaff),
  totalCount: z.number(),
})

export type StaffType = z.infer<typeof ZStaff>
export type StaffResponseType = z.infer<typeof ZStaffResponse>
export type StaffValidatorType = z.infer<typeof ZStaffValidator>
