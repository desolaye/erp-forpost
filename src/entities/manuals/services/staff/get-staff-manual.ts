import { publicApi } from '@/shared/api/public-api.config'
import { StaffResponseType } from '../../model/staff.manual'

interface IGetStaffManual {
  params: {
    skip: number
    limit: number
  }
}

export const getStaffManual = async (props: IGetStaffManual) => {
  const { params } = props

  const response = await publicApi.get<StaffResponseType>('v1/employees', { params })
  return response
}
