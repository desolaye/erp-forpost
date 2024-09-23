import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  IssueExecutorValidatorType,
  putAssignExecutor,
  ZIssueExecutorValidator,
} from '@/entities/my-issues'
import { staffToOptions } from '@/entities/manuals'

import { IMyIssuesModalProps } from '../model/my-issues-modal-props.interface'

export const useSelectExecutor = (props: IMyIssuesModalProps) => {
  const { issueId, staff, defaultValue, onClose } = props
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IssueExecutorValidatorType>({
    resolver: zodResolver(ZIssueExecutorValidator),
    defaultValues: { executorId: defaultValue },
  })

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: IssueExecutorValidatorType) =>
      putAssignExecutor(issueId, data.executorId.value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues_all'] })
      if (onClose) onClose()
    },
  })

  const submit: SubmitHandler<IssueExecutorValidatorType> = (data) => {
    mutateAsync(data)
    if (onClose) onClose()
  }

  return {
    values: {
      users: staffToOptions(staff),
      isPending,
      errors,
      error,
    },
    handlers: {
      handleSubmit,
      submit,
      mutateAsync,
      control,
    },
  }
}
