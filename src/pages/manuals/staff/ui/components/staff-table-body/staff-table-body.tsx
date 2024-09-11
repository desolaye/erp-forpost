import { StaffType } from '@/entities/manuals'
import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

import { useStaffTable } from '../../../lib/use-staff-table.config'

interface IStaffTableBody {
  data?: StaffType[]
}

export const StaffTableBody = (props: IStaffTableBody) => {
  const { data } = props
  const { getDisplayValues } = useStaffTable()

  return data?.map((staff) => (
    <Button key={staff.id} mode="table" style={{ display: 'flex', gap: 8 }}>
      {getDisplayValues().map(([key, value]) => (
        <Text key={key} style={{ width: value.size, overflow: 'hidden' }}>
          {staff[key]}
        </Text>
      ))}
    </Button>
  ))
}
