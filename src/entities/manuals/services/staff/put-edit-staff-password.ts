import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  staffId: string
  password: string
}

export const putEditStaffPassword = async (props: RequestProps) => {
  const { password, staffId } = props

  const response = await publicApi.put(`v1/employees/${staffId}/password`, {
    password,
  })

  if (response.status >= 400) throw new Error()
  return response
}
