import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { useFileLoader } from '@/shared/lib/use-file-loader'

import {
  deleteInvoiceById,
  deleteInvoiceProductById,
  getInvoiceById,
  getInvoiceProducts,
  InvoiceProductResponseType,
  postCreateInvoiceProduct,
  putEditInvoiceClosingDate,
  putEditInvoiceDescription,
  putEditInvoicePayment,
  putEditInvoicePercents,
  putEditInvoicePriority,
  putEditInvoiceProductQuantity,
  putEditInvoiceShipment,
} from '@/entities/crm/invoices'

import { getProductsManual, productsToOptions } from '@/entities/manuals'
import { postSendToManufacturingOrders } from '@/entities/manufacture'

interface IUseInvoiceDetailed {
  invoiceId: string
  onClose?: () => void
}

export const useInvoiceDetailed = (props: IUseInvoiceDetailed) => {
  const { invoiceId, onClose } = props

  const queryClient = useQueryClient()
  const [tab, setTab] = useState('data')

  const [isDeleting, setIsDeleting] = useState(false)
  const [deletingProduct, setDeletingProduct] = useState<InvoiceProductResponseType>()

  const onSuccess = () => {
    setDeletingProduct(undefined)
    queryClient.invalidateQueries({ queryKey: ['invoice_by_id', invoiceId] })
    queryClient.invalidateQueries({ queryKey: ['invoice_history_by_id', invoiceId] })
    queryClient.invalidateQueries({ queryKey: ['invoices_all'] })
    queryClient.invalidateQueries({ queryKey: ['invoice_products_all'] })
  }

  const {
    files,
    isPendingFile: isLoadingFile,
    mutateFile,
  } = useFileLoader(invoiceId, 'files_all')

  const { data: invoice, isFetching: isLoadingInvoice } = useQuery({
    queryFn: () => getInvoiceById(invoiceId),
    queryKey: ['invoice_by_id', invoiceId],
  })

  const { data: products, isFetching: isLoadingProducts } = useQuery({
    queryFn: () => getInvoiceProducts(invoiceId),
    queryKey: ['invoice_products_all'],
  })

  const { data: productsAll, isFetching: isLoadingProductsAll } = useQuery({
    queryFn: () => getProductsManual({ limit: 1000, skip: 0 }),
    queryKey: ['products_all'],
  })

  const mutateDelete = useMutation({
    mutationFn: () => deleteInvoiceById(invoiceId),
    onSuccess: () => {
      onSuccess()
      if (onClose) onClose()
    },
  })

  const mutatePayment = useMutation({
    mutationFn: (payment: number) => putEditInvoicePayment({ id: invoiceId, payment }),
    onSuccess,
  })

  const mutatePriority = useMutation({
    mutationFn: (priority: number) => putEditInvoicePriority({ id: invoiceId, priority }),
    onSuccess,
  })

  const mutateShipment = useMutation({
    mutationFn: (shipment: string) =>
      putEditInvoiceShipment({ id: invoiceId, date: shipment }),
    onSuccess,
  })

  const mutatePercent = useMutation({
    mutationFn: (percent: number) => putEditInvoicePercents({ id: invoiceId, percent }),
    onSuccess,
  })

  const mutateDescription = useMutation({
    mutationFn: (description: string) =>
      putEditInvoiceDescription({ id: invoiceId, description }),
    onSuccess,
  })

  const mutateProductQuantity = useMutation({
    mutationFn: putEditInvoiceProductQuantity,
    onSuccess,
  })

  const mutateProductDelete = useMutation({
    mutationFn: deleteInvoiceProductById,
    onSuccess,
  })

  const mutateProductAdd = useMutation({
    mutationFn: postCreateInvoiceProduct,
    onSuccess,
  })

  const mutateClosingDate = useMutation({
    mutationFn: (date: string) => putEditInvoiceClosingDate({ id: invoiceId, date }),
    onSuccess,
  })

  const sendToManufacture = useMutation({
    mutationFn: postSendToManufacturingOrders,
    onSuccess,
  })

  return {
    values: {
      tab,
      files,
      products,
      productsAll: productsToOptions(productsAll?.data.items),
      invoice,
      isDeleting,
      deletingProduct,
      isLoading:
        isLoadingProducts ||
        isLoadingInvoice ||
        isLoadingFile ||
        isLoadingProductsAll ||
        mutatePayment.isPending ||
        mutateShipment.isPending ||
        mutatePriority.isPending ||
        mutatePercent.isPending ||
        mutateDescription.isPending ||
        mutateProductAdd.isPending ||
        mutateProductDelete.isPending ||
        mutateProductQuantity.isPending ||
        mutateClosingDate.isPending ||
        sendToManufacture.isPending ||
        mutateDelete.isPending,
      isPriorityError: mutatePriority.isError,
      isPaymentError: mutatePayment.isError,
      isShipmentError: mutateShipment.isError,
      isPercentError: mutatePercent.isError,
      isDescriptionError: mutateDescription.isError,
      isClosingDateError: mutateClosingDate.isError,
    },
    handlers: {
      setTab,
      setIsDeleting,
      setDeletingProduct,
      mutateFile,
      sendToManufacture: sendToManufacture.mutateAsync,
      deleteInvoice: mutateDelete.mutateAsync,
      deleteInvoiceProduct: mutateProductDelete.mutateAsync,
      addInvoiceProduct: mutateProductAdd.mutateAsync,
      editPayment: mutatePayment.mutateAsync,
      editInvoiceProductQuantity: mutateProductQuantity.mutateAsync,
      editPercent: mutatePercent.mutateAsync,
      editShipment: mutateShipment.mutateAsync,
      editPriority: mutatePriority.mutateAsync,
      editDescription: mutateDescription.mutateAsync,
      editClosingDate: mutateClosingDate.mutateAsync,
    },
  }
}
