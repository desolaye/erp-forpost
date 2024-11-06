import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  getOperationsAll,
  postAddStepToCard,
  postCreateStep,
  StepValidatorType,
} from '@/entities/manuals'

interface IUseStepsEditor {
  id: string
  onClose?: () => void
}

export const useStepsEditor = (props: IUseStepsEditor) => {
  const { id, onClose } = props
  const queryClient = useQueryClient()

  const { data: operations, isPending: isPendingOperations } = useQuery({
    queryKey: ['operations_all'],
    queryFn: getOperationsAll,
  })

  const {
    mutateAsync,
    isPending: isPendingCreation,
    isError,
  } = useMutation({
    mutationFn: (step: StepValidatorType) => {
      return postCreateStep({ ...step, techCardId: id }).then((data) =>
        postAddStepToCard({ stepId: data.data, techCardId: id, number: step.number }),
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techcard_full', id] })
      if (onClose) onClose()
    },
  })

  return {
    values: {
      operations: operations?.data,
      isPendingCreation,
      isError,
      isPendingOperations,
    },
    handlers: {
      mutateAsync,
    },
  }
}
