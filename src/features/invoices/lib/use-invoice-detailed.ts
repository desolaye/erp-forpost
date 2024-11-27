import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { useFileLoader } from '@/shared/lib/use-file-loader'
import {
  deleteInvoiceById,
  getInvoiceById,
  getInvoiceProducts,
  putEditInvoiceDescription,
  putEditInvoicePayment,
  putEditInvoicePercents,
  putEditInvoicePriority,
  putEditInvoiceShipment,
} from '@/entities/invoices'

interface IUseInvoiceDetailed {
  invoiceId: string
  onClose?: () => void
}

export const useInvoiceDetailed = (props: IUseInvoiceDetailed) => {
  const { invoiceId, onClose } = props

  const queryClient = useQueryClient()
  const [tab, setTab] = useState('data')
  const [isDeleting, setIsDeleting] = useState(false)

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['invoice_by_id', invoiceId] })
    queryClient.invalidateQueries({ queryKey: ['invoice_history_by_id', invoiceId] })
    queryClient.invalidateQueries({ queryKey: ['invoices_all'] })
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

  return {
    values: {
      tab,
      files,
      products,
      invoice,
      isDeleting,
      isLoading:
        isLoadingProducts ||
        isLoadingInvoice ||
        isLoadingFile ||
        mutatePayment.isPending ||
        mutateShipment.isPending ||
        mutatePriority.isPending ||
        mutatePercent.isPending ||
        mutateDescription.isPending ||
        mutateDelete.isPending,
      isPriorityError: mutatePriority.isError,
      isPaymentError: mutatePayment.isError,
      isShipmentError: mutateShipment.isError,
      isPercentError: mutatePercent.isError,
      isDescriptionError: mutateDescription.isError,
    },
    handlers: {
      setTab,
      setIsDeleting,
      mutateFile,
      deleteInvoice: mutateDelete.mutateAsync,
      editPayment: mutatePayment.mutateAsync,
      editPercent: mutatePercent.mutateAsync,
      editShipment: mutateShipment.mutateAsync,
      editPriority: mutatePriority.mutateAsync,
      editDescription: mutateDescription.mutateAsync,
    },
  }
}
