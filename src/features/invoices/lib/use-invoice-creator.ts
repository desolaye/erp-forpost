import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  agentsToOptions,
  getAgentsManual,
  getProductsManual,
  productsToOptions,
} from '@/entities/manuals'

import { InvoiceValidatorType, postCreateInvoice } from '@/entities/invoices'

interface IInvoiceCreatorProps {
  onClose?: () => void
}

export const useInvoiceCreator = (props: IInvoiceCreatorProps) => {
  const { onClose } = props
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: InvoiceValidatorType) => postCreateInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices_all'] })
      if (onClose) onClose()
    },
  })

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryFn: () => getProductsManual({ limit: 1000, skip: 0 }),
    queryKey: ['products_all'],
  })

  const { data: agents, isLoading: isLoadingAgents } = useQuery({
    queryFn: () => getAgentsManual({ params: { limit: 1000, skip: 0 } }),
    queryKey: ['agents_all'],
  })

  return {
    values: {
      error,
      isPending,
      isLoading: isLoadingProducts || isLoadingAgents,
      agents: agentsToOptions(agents?.data.contractors),
      products: productsToOptions(products?.data.items),
    },
    handlers: {
      onMutate: mutateAsync,
    },
  }
}
