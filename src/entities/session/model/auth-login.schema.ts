import { z } from 'zod'

export const ZAuthLogin = z.object({
  firstName: z.string().min(3, 'Имя должно быть не менее 3 символов'),
  lastName: z.string().min(3, 'Фамилия должна быть не менее 3 символов'),
  password: z.string().min(3, 'Пароль слишком короткий'),
})

export type AuthLoginType = z.infer<typeof ZAuthLogin>
