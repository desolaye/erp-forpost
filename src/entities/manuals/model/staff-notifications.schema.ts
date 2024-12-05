import { z } from 'zod'

export const ZAppNotification = z.object({
  id: z.string().uuid(),
  notificationName: z.string(),
})

export const ZAppStaffNotification = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  notificationId: z.string().uuid(),
})

export type AppNotificationType = z.infer<typeof ZAppNotification>
export type AppStaffNotificationType = z.infer<typeof ZAppStaffNotification>
