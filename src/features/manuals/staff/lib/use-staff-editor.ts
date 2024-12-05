import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useFileLoader } from '@/shared/lib/use-file-loader'
import {
  getRoles,
  postCreateStaff,
  putEditStaff,
  deleteStaffById,
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

  const tabList = useMemo(() => {
    return [
      {
        label: 'Пароль',
        value: 'password',
        disabled: !Boolean(staff?.id && staff?.id !== 'new'),
      },
      {
        label: 'Уведомления',
        value: 'notifications',
        disabled: !Boolean(staff?.id && staff?.id !== 'new'),
      },
    ]
  }, [])

  const queryClient = useQueryClient()

  const { files, isPendingFile, mutateFile } = useFileLoader(
    staff?.id || 'new',
    'files_all',
  )

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['staff_by_id', staff?.id || ''] })
    queryClient.invalidateQueries({ queryKey: ['staff_all'] })
    if (onClose) onClose()
  }

  const createStaff = useMutation({
    mutationFn: postCreateStaff,
    onSuccess,
  })

  const editStaff = useMutation({
    mutationFn: putEditStaff,
    onSuccess,
  })

  const deleteStaff = useMutation({
    mutationFn: () => deleteStaffById(staff?.id || 'new'),
    onSuccess,
  })

  const { data: roles, isLoading: isLoadingRoles } = useQuery({
    queryFn: getRoles,
    queryKey: ['roles_all'],
  })

  const handleMutate = (empl: StaffValidatorType) => {
    if (staff?.id) editStaff.mutateAsync(empl)
    else createStaff.mutateAsync(empl)
  }

  return {
    values: {
      isError: createStaff.isError || editStaff.isError || deleteStaff.isError,
      isMutateLoading:
        createStaff.isPending || editStaff.isPending || deleteStaff.isPending,
      isLoading: isLoadingRoles,
      roles: getRolesOptions(roles?.data),
      files,
      isPendingFile,
      tabList,
      tab,
      employee: staffToModel(staff, roles?.data),
    },
    handlers: {
      onMutate: handleMutate,
      onDelete: deleteStaff.mutateAsync,
      mutateFile,
      setTab,
    },
  }
}
