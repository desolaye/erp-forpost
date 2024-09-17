import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getStaffManual, getStepsAll, getTechcardsManual } from '@/entities/manuals'
import { postCreateProcess, ProcessValidatorType } from '@/entities/manufacture'

interface IProcessCreatorProps {
  onClose?: () => void
}

export const useProcessCreator = (props: IProcessCreatorProps) => {
  const { onClose } = props

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: ProcessValidatorType) => postCreateProcess(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processes_all'] })
      if (onClose) onClose()
    },
  })

  const { data: techcards, isLoading: isLoadingTechcards } = useQuery({
    queryFn: () => getTechcardsManual({ params: { limit: 1000, skip: 0 } }),
    queryKey: ['techcard_all'],
  })

  const { data: staff, isLoading: isLoadingStaff } = useQuery({
    queryFn: () => getStaffManual({ params: { limit: 1000, skip: 0 } }),
    queryKey: ['staff_all'],
  })

  const { data: steps, isLoading: isLoadingSteps } = useQuery({
    queryFn: () => getStepsAll({ params: { limit: 1000, skip: 0 } }),
    queryKey: ['steps_all'],
  })

  return {
    values: {
      error,
      isPending,
      isLoading: isLoadingStaff || isLoadingSteps || isLoadingTechcards,
      staff: staff?.data.employees || [],
      steps: steps?.data.steps || [],
      techcards: techcards?.data.techCards || [],
    },
    handlers: {
      onMutate: mutateAsync,
    },
  }
}
