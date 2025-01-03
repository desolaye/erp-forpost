import { z } from 'zod'

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

export const ZStaff = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string().nullable(),
  post: z.string(),
  role: z.string(),
  roleId: z.string().uuid(),
  email: z.string().email(),
  phoneNumber: z.string(),
})

export const ZStaffValidator = ZStaff.extend({
  id: z.string(),
  firstName: z.string().min(3, 'Имя должно быть не менее 3 символов'),
  lastName: z.string().min(3, 'Фамилия должна быть не менее 3 символов'),
  password: z.string(),
  post: z.string().min(3, 'Доложность должна состоять из 3 символов минимум'),
  email: z.string().email('Неверный формат почты'),
  phoneNumber: z.string().regex(phoneRegex, 'Неверный формат телефона'),

  role: z.object({
    value: z.string().uuid(),
    label: z.string(),
  }),

  roleId: z.string().optional(),
})

export const ZStaffResponse = z
  .object({
    items: z.array(ZStaff),
    totalCount: z.number(),
  })
  .transform((data) => ({
    employees: data.items.map((v) => ({
      ...v,
      patronymic: v.patronymic || 'Нет данных',
    })),
    totalCount: data.totalCount,
  }))

export type StaffType = z.infer<typeof ZStaff>
export type StaffResponseType = z.infer<typeof ZStaffResponse>
export type StaffValidatorType = z.infer<typeof ZStaffValidator>
