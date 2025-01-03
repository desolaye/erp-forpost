import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useFileLoader } from '@/shared/lib/use-file-loader'

import { getProductsManual, productsToOptions } from '@/entities/manuals'

import {
  deleteOrderProduct,
  getManufacturingOrderById,
  getOrderCompositionById,
  ManufacturingOrderProductType,
  postCreateOrderProduct,
  putEditOrderComment,
  putEditOrderProductQuantity,
} from '@/entities/manufacture'
import { getInvoiceProducts } from '@/entities/crm/invoices'

type HookProps = {
  orderId: string
}

export const useManufacturingOrdersDetailed = (props: HookProps) => {
  const { orderId } = props

  const queryClient = useQueryClient()

  const [tab, setTab] = useState('data')
  const [deletingProduct, setDeletingProduct] = useState<ManufacturingOrderProductType>()

  const onSuccess = () => {
    setDeletingProduct(undefined)
    queryClient.invalidateQueries({ queryKey: ['order_by_id', orderId] })
    queryClient.invalidateQueries({ queryKey: ['orders_all'] })
    queryClient.invalidateQueries({ queryKey: ['order_products_all'] })
  }

  const {
    files,
    isPendingFile: isLoadingFile,
    mutateFile,
  } = useFileLoader(orderId, 'files_all')

  const { data: order, isFetching: isLoadingOrder } = useQuery({
    queryFn: () => getManufacturingOrderById(orderId),
    queryKey: ['order_by_id', orderId],
    refetchOnWindowFocus: false,
  })

  const { data: products, isFetching: isLoadingProducts } = useQuery({
    queryFn: () => getOrderCompositionById(orderId),
    queryKey: ['order_products_all', orderId],
    refetchOnWindowFocus: false,
  })

  const { data: productsInvoice, isFetching: isLoadingInvoiceProduct } = useQuery({
    queryFn: () => getInvoiceProducts(order?.invoiceId || ''),
    queryKey: ['invoice_products_all', order?.invoiceId || ''],
    enabled: Boolean(order?.invoiceId),
    refetchOnWindowFocus: false,
  })

  const { data: productsAll, isFetching: isLoadingProductsAll } = useQuery({
    queryFn: () => getProductsManual({ limit: 1000, skip: 0 }),
    queryKey: ['products_all'],
    refetchOnWindowFocus: false,
  })

  const mutateOrderComment = useMutation({
    mutationFn: (comment: string) => putEditOrderComment({ id: orderId, comment }),
    onSuccess,
  })

  const mutateProductQuantity = useMutation({
    mutationFn: putEditOrderProductQuantity,
    onSuccess,
  })

  const mutateProductDelete = useMutation({
    mutationFn: deleteOrderProduct,
    onSuccess,
  })

  const mutateProductAdd = useMutation({
    mutationFn: postCreateOrderProduct,
    onSuccess,
  })

  return {
    values: {
      files,
      order,
      products,
      productsAll: productsToOptions(productsAll?.data.items),
      productsInvoice,
      deletingProduct,
      tab,
      isLoading:
        isLoadingFile ||
        isLoadingProducts ||
        isLoadingProductsAll ||
        isLoadingOrder ||
        isLoadingInvoiceProduct ||
        mutateProductQuantity.isPending ||
        mutateProductDelete.isPending ||
        mutateOrderComment.isPending ||
        mutateProductAdd.isPending,
    },
    handlers: {
      setTab,
      mutateFile,
      setDeletingProduct,
      addProduct: mutateProductAdd.mutateAsync,
      editQuantity: mutateProductQuantity.mutateAsync,
      editComment: mutateOrderComment.mutateAsync,
      deleteProduct: mutateProductDelete.mutateAsync,
    },
  }
}
