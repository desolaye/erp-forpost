import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  getProductsManual,
  postCreateTechcard,
  TechcardValidatorType,
} from '@/entities/manuals'
import { SessionContext } from '@/entities/session'

interface IUseTechcardCreator {
  onClose?: () => void
}

export const useTechcardCreator = (props: IUseTechcardCreator) => {
  const { onClose } = props

  const queryClient = useQueryClient()
  const sessionContext = useContext(SessionContext)

  const { data: items, isPending: isPendingItems } = useQuery({
    queryKey: ['items_all'],
    queryFn: () => getProductsManual({ params: { limit: 1000, skip: 0 } }),
  })

  const { mutateAsync, isPending: isPendingCreation } = useMutation({
    mutationFn: (data: TechcardValidatorType) =>
      postCreateTechcard({ ...data, createdById: sessionContext.session?.id || '' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techcards_all'] })
      if (onClose) onClose()
    },
  })

  return {
    values: {
      items: items?.data.products,
      isPendingItems,
      isPendingCreation,
    },
    handlers: {
      mutateAsync,
    },
  }
}
