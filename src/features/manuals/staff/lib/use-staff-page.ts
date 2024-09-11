import { useQuery } from '@tanstack/react-query'

import { getStaffManual } from '@/entities/manuals'

export const useStaffPage = () => {
  const { data: staff, isPending } = useQuery({
    queryFn: getStaffManual,
    queryKey: ['staff_all'],
  })

  return {
    values: {
      data: staff?.data,
      isPending,
    },
  }
}
