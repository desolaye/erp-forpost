import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useFileLoader } from '@/shared/lib/use-file-loader'
import {
  getRoles,
  postCreateStaff,
  staffToModel,
  StaffType,
  StaffValidatorType,
} from '@/entities/manuals'

import { getRolesOptions } from '../utils/get-roles-options'

interface IStaffEditorProps {
  staff?: StaffType
  onClose?: () => void
}

export const useStaffEditor = (props: IStaffEditorProps) => {
  const { staff, onClose } = props
  const [tab, setTab] = useState('data')

  const queryClient = useQueryClient()

  const { files, isPendingFile, mutateFile } = useFileLoader(
    staff?.id || 'new',
    'files_all',
  )

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: StaffValidatorType) => postCreateStaff(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff_by_id', staff?.id || ''] })
      queryClient.invalidateQueries({ queryKey: ['staff_all'] })
      if (onClose) onClose()
    },
  })

  const { data: roles, isLoading: isLoadingRoles } = useQuery({
    queryFn: getRoles,
    queryKey: ['roles_all'],
  })

  return {
    values: {
      isError: Boolean(error),
      isPending,
      isLoading: isLoadingRoles,
      roles: getRolesOptions(roles?.data),
      files,
      isPendingFile,
      tab,
      employee: staffToModel(staff, roles?.data),
    },
    handlers: {
      onMutate: mutateAsync,
      mutateFile,
      setTab,
    },
  }
}
