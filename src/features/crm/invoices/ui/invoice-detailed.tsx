import { ModalEditor } from '@/shared/ui/modal-editor'
import { FileAdd } from '@/shared/ui/file'
import { Loader } from '@/shared/ui/loader'

import { ManualHeader } from '@/entities/manuals'
import { File } from '@/entities/files'

import { useInvoiceDetailed } from '../lib/use-invoice-detailed'

import { InvoiceProductsBody } from './components/invoice-products-body'
import { InvoiceStatusesTab } from './components/invoice-statuses-tab'
import { InvoiceHistoryTab } from './components/invoice-history-tab'

import { InvoiceDelete } from './components/detailed/invoice-delete'
import { InvoiceProductDelete } from './components/detailed/invoice-product-delete'

interface IInvoiceDetailedProps {
  invoiceId: string
  onClose?: () => void
}

export const InvoiceDetailed = (props: IInvoiceDetailedProps) => {
  const { invoiceId } = props

  const { values, handlers } = useInvoiceDetailed(props)

  if (values.isLoading) return <Loader />

  if (values.isDeleting) {
    return (
      <InvoiceDelete
        invoiceNumber={values.invoice?.number}
        onDelete={() => handlers.deleteInvoice()}
        onReject={() => handlers.setIsDeleting(false)}
      />
    )
  }

  if (values.deletingProduct) {
    return (
      <InvoiceProductDelete
        productName={values.deletingProduct.name}
        invoiceNumber={values.invoice?.number}
        onDelete={() => handlers.deleteInvoiceProduct(values.deletingProduct!.id)}
        onReject={() => handlers.setDeletingProduct(undefined)}
      />
    )
  }

  return (
    <ModalEditor
      header={
        <ManualHeader
          id={invoiceId}
          onDelete={() => handlers.setIsDeleting(true)}
          setTab={handlers.setTab}
          tab={values.tab}
          tabs={[
            { label: 'Управление', value: 'statuses' },
            { label: 'История изменений', value: 'history' },
          ]}
        />
      }
    >
      {values.tab === 'data' && (
        <InvoiceProductsBody
          data={values.products}
          invoice={values.invoice}
          products={values.productsAll}
          onDescriptionChange={handlers.editDescription}
          onProductCreate={(productId, quantity) =>
            handlers.addInvoiceProduct({ invoiceId, productId, quantity })
          }
          onProductDelete={handlers.setDeletingProduct}
          onProductEdit={(quantity, id) =>
            handlers.editInvoiceProductQuantity({ id, quantity })
          }
        />
      )}

      {values.tab === 'files' && (
        <>
          <FileAdd onLoad={handlers.mutateFile} />
          {values.files?.map((file) => (
            <File title={file.fileName} link={file.id} key={file.id} />
          ))}
        </>
      )}

      {values.tab === 'statuses' && (
        <InvoiceStatusesTab
          editPayment={handlers.editPayment}
          editPriority={handlers.editPriority}
          editShipment={handlers.editShipment}
          editClosingDate={handlers.editClosingDate}
          editPercent={handlers.editPercent}
          sendToManufacture={handlers.sendToManufacture}
          invoice={values.invoice}
          isPaymentError={values.isPaymentError}
          isPriorityError={values.isPriorityError}
          isShipmentError={values.isShipmentError}
          isClosingDateError={values.isClosingDateError}
        />
      )}

      {values.tab === 'history' && <InvoiceHistoryTab invoiceId={invoiceId} />}
    </ModalEditor>
  )
}
