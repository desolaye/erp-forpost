import { publicApi } from '@/shared/api/public-api.config'

import { StaffResponseType, ZStaffResponse } from '../../model/staff.manual'

type RequestProps = {
  skip?: number
  limit?: number
  lastName?: string
}

export const getStaffManual = async (props: RequestProps) => {
  const { lastName, limit, skip } = props

  const response = await publicApi.get<StaffResponseType>('v1/employees', {
    params: {
      Lastname: lastName,
      Skip: skip,
      Limit: limit,
    },
  })

  const parsed = ZStaffResponse.safeParse(response.data)

  if (parsed.error) console.warn(parsed.error)
  if (parsed.error || response.status >= 400) throw new Error()

  return parsed
}
