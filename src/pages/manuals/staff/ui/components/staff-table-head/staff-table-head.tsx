import { Text } from '@/shared/ui/text'
import { useStaffTable } from '../../../lib/use-staff-table.config'

export const StaffTableHead = () => {
  const { getDisplayValues } = useStaffTable()

  return getDisplayValues().map(([key, value]) => (
    <Text key={key} weight="semi" style={{ width: value.size }}>
      {value.title}
    </Text>
  ))
}
