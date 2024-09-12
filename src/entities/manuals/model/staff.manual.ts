import { z } from 'zod'

export const ZStaff = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string(),
  post: z.string(),
  role: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
})

export const ZStaffResponse = z.object({
  employees: z.array(ZStaff),
  totalCount: z.number(),
})

export type StaffType = z.infer<typeof ZStaff>
export type StaffResponseType = z.infer<typeof ZStaffResponse>
