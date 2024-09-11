import { publicApi } from '@/shared/api/public-api.config'
import { StaffType } from '../../model/staff.manual'

export const getStaffManual = async () => {
  const response = await publicApi.get<StaffType[]>('v1/employees')
  return response
}
