import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@/shared/lib/use-search'

import { getStaffManual } from '@/entities/manuals'
import { postCreateProcess, ProcessValidatorType } from '@/entities/manufacture'
import { getTechcardsAll } from '@/entities/manuals/techcards'

interface IProcessCreatorProps {
  onClose?: () => void
}

export const useProcessCreator = (props: IProcessCreatorProps) => {
  const { onClose } = props

  const queryClient = useQueryClient()

  const techcardSearch = useSearch('number')
  const staffSearch = useSearch('lastName')

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: ProcessValidatorType) => postCreateProcess(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processes_all'] })
      if (onClose) onClose()
    },
  })

  const { data: techcards } = useQuery({
    queryFn: () =>
      getTechcardsAll({
        limit: 8,
        skip: 0,
        number: techcardSearch.filters?.filterValues,
      }),
    queryKey: ['techcard_all', techcardSearch.debouncedSearch],
  })

  const { data: staff } = useQuery({
    queryFn: () =>
      getStaffManual({ lastName: staffSearch.filters?.filterValues, limit: 20, skip: 0 }),
    queryKey: ['staff_all', staffSearch.debouncedSearch],
  })

  return {
    values: {
      error,
      isPending,
      staff: staff?.data?.employees || [],
      techcards,
    },
    handlers: {
      onMutate: mutateAsync,
      onStaffSearch: staffSearch.setSearch,
      onTechcardSearch: staffSearch.setSearch,
    },
  }
}
