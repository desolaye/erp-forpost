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

  const { data: operations, isFetching } = useQuery({
    queryKey: ['operations_all'],
    queryFn: getOperationsAll,
  })

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['techcard_full', id] })
    if (onClose) onClose()
  }

  const createStep = useMutation({
    mutationFn: (step: StepValidatorType) => {
      return postCreateStep({ ...step, techCardId: id }).then((data) =>
        postAddStepToCard({ stepId: data.data, techCardId: id, number: step.number }),
      )
    },
    onSuccess,
  })

  const editStep = useMutation({
    mutationFn: (step: StepValidatorType) => {
      return postCreateStep({ ...step, techCardId: id }).then((data) =>
        postAddStepToCard({ stepId: data.data, techCardId: id, number: step.number }),
      )
    },
    onSuccess,
  })

  const deleteStep = useMutation({
    mutationFn: (step: StepValidatorType) => {
      return postCreateStep({ ...step, techCardId: id }).then((data) =>
        postAddStepToCard({ stepId: data.data, techCardId: id, number: step.number }),
      )
    },
    onSuccess,
  })

  const onMutate = (step: StepValidatorType) => {
    if (false) return editStep.mutateAsync(step)
    return createStep.mutateAsync(step)
  }

  return {
    values: {
      operations: operations?.data,
      isPending: createStep.isPending,
      isError: createStep.isError,
      isFetching,
    },
    handlers: {
      onMutate: onMutate,
      onDelete: deleteStep.mutateAsync,
    },
  }
}
