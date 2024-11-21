import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useFileLoader } from '@/shared/lib/use-file-loader'
import {
  deleteInvoiceById,
  getInvoiceById,
  getInvoiceProducts,
  putEditInvoicePayment,
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
  const [shipmentDate, setShipmentDate] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['invoice_by_id', invoiceId] })
    queryClient.invalidateQueries({ queryKey: ['invoices_all'] })
  }

  const {
    files,
    isPendingFile: isLoadingFile,
    mutateFile,
  } = useFileLoader(invoiceId, 'files_all')

  const { data: invoice, isLoading: isLoadingInvoice } = useQuery({
    queryFn: () => getInvoiceById(invoiceId),
    queryKey: ['invoice_by_id', invoiceId],
  })

  const { data: products, isLoading: isLoadingProducts } = useQuery({
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

  const editShipment = () => {
    if (shipmentDate) mutateShipment.mutateAsync(shipmentDate)
  }

  useEffect(() => {
    if (invoice && !shipmentDate) setShipmentDate(invoice.dateShipment)
  }, [invoice])

  return {
    values: {
      tab,
      files,
      products,
      invoice,
      shipmentDate,
      isDeleting,
      isLoading:
        isLoadingProducts ||
        isLoadingInvoice ||
        isLoadingFile ||
        mutatePayment.isPending ||
        mutateShipment.isPending ||
        mutatePriority.isPending ||
        mutateDelete.isPending,
      isPriorityError: mutatePriority.isError,
      isPaymentError: mutatePayment.isError,
      isShipmentError: mutateShipment.isError,
    },
    handlers: {
      setTab,
      setIsDeleting,
      setShipmentDate,
      mutateFile,
      deleteInvoice: mutateDelete.mutateAsync,
      editPayment: mutatePayment.mutateAsync,
      editShipment,
      editPriority: mutatePriority.mutateAsync,
    },
  }
}
