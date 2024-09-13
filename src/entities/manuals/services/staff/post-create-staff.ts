import { publicApi } from '@/shared/api/public-api.config'
import { StaffValidatorType } from '../../model/staff.manual'

export const postCreateStaff = async (staff: StaffValidatorType) => {
  const response = await publicApi.post('v1/accounts', {
    ...staff,
    role: staff.role.value,
  })
  return response
}
