import { useQuery } from '@tanstack/react-query'
import { getInvoiceProducts } from '@/entities/invoices'

interface IUseInvoiceProducts {
  invoiceId: string
}

export const useInvoiceProducts = (props: IUseInvoiceProducts) => {
  const { invoiceId } = props

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryFn: () => getInvoiceProducts(invoiceId),
    queryKey: ['invoice_products_all'],
  })

  return {
    values: {
      products,
      isLoading: isLoadingProducts,
    },
  }
}
