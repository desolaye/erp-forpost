import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  agentsToOptions,
  getAgentsManual,
  getProductsManual,
  productsToOptions,
} from '@/entities/manuals'

import { InvoiceValidatorType, postCreateInvoice } from '@/entities/crm/invoices'

interface IInvoiceCreatorProps {
  onClose?: () => void
}

export const useInvoiceCreator = (props: IInvoiceCreatorProps) => {
  const { onClose } = props
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError } = useMutation({
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
    queryFn: () => getAgentsManual({ limit: 1000, skip: 0 }),
    queryKey: ['agents_all'],
  })

  return {
    values: {
      isError,
      isLoading: isLoadingProducts || isLoadingAgents || isPending,
      agents: agentsToOptions(agents?.data.items),
      products: productsToOptions(products?.data.items),
    },
    handlers: {
      onMutate: mutateAsync,
    },
  }
}
