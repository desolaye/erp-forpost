import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useSearch } from '@/shared/lib/use-search'

import {
  agentsToOptions,
  getAgentsManual,
  getProductsManual,
  productsToOptions,
} from '@/entities/manuals'

import { postCreateInvoice } from '@/entities/crm/invoices'

interface IInvoiceCreatorProps {
  onClose?: () => void
}

export const useInvoiceCreator = (props: IInvoiceCreatorProps) => {
  const { onClose } = props
  const queryClient = useQueryClient()

  const productSearch = useSearch('name')
  const agentSearch = useSearch('name')

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: postCreateInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices_all'] })
      if (onClose) onClose()
    },
  })

  const { data: products } = useQuery({
    queryFn: () =>
      getProductsManual({
        limit: 100,
        skip: 0,
        name: productSearch.filters?.filterValues,
      }),
    queryKey: ['products_all', productSearch.debouncedSearch],
  })

  const { data: agents } = useQuery({
    queryFn: () =>
      getAgentsManual({ limit: 100, skip: 0, name: agentSearch.filters?.filterValues }),
    queryKey: ['agents_all', agentSearch.debouncedSearch],
  })

  return {
    values: {
      isError,
      isLoading: isPending,
      agents: agentsToOptions(agents?.data?.items),
      products: productsToOptions(products?.data?.items),
    },
    handlers: {
      onMutate: mutateAsync,
      onProductSearch: productSearch.setSearch,
      onAgentSearch: agentSearch.setSearch,
    },
  }
}
