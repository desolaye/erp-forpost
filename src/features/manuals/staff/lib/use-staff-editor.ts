import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getRoles, postCreateStaff, StaffValidatorType } from '@/entities/manuals'
import { getRolesOptions } from '../utils/get-roles-options'

interface IStaffEditorProps {
  id: string
  onClose?: () => void
}

export const useStaffEditor = (props: IStaffEditorProps) => {
  const { id, onClose } = props

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: StaffValidatorType) => postCreateStaff(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff_by_id', id] })
      queryClient.invalidateQueries({ queryKey: ['staff_all'] })
      if (onClose) onClose()
    },
  })

  const { data: roles, isLoading: isLoadingStaff } = useQuery({
    queryFn: getRoles,
    queryKey: ['roles_all'],
  })

  return {
    values: {
      error,
      isPending,
      isLoading: isLoadingStaff,
      roles: getRolesOptions(roles?.data),
    },
    handlers: {
      onMutate: mutateAsync,
    },
  }
}
