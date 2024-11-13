import { publicApi } from '@/shared/api/public-api.config'
import { StaffValidatorType } from '../../model/staff.manual'

export const putEditStaff = async (staff: StaffValidatorType) => {
  const response = await publicApi.put(`v1/employees/${staff.id}`, {
    ...staff,
    role: staff.role.label,
  })

  if (response.status >= 400) throw new Error()
  return response
}
