import { isoToTime } from '@/shared/utils/iso-to-time'
import { z } from 'zod'

export const ZNotification = z.object({
  id: z.string().uuid(),
  createdById: z.string().uuid(),

  message: z.string(),
  authorName: z.string(),
  createdAt: z.string(),
})

export const ZNotificationValidator = z.object({
  message: z.string(),
})

export const ZNotificationResponse = z
  .object({
    notifications: z.array(ZNotification),
    totalCount: z.number(),
  })
  .transform((data) => ({
    ...data,
    notifications: data.notifications.map((v) => ({
      ...v,
      createdAt: isoToTime(v.createdAt, true),
    })),
  }))

export type NotificationType = z.infer<typeof ZNotification>
export type NotificationResponseType = z.infer<typeof ZNotificationResponse>
export type NotificationValidatorType = z.infer<typeof ZNotificationValidator>
