import { Text } from '@/shared/ui/text'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { FileAdd } from '@/shared/ui/file'
import { Loader } from '@/shared/ui/loader'
import { Button } from '@/shared/ui/button'

import { ManualHeader } from '@/entities/manuals'
import { File } from '@/entities/files'

import { useInvoiceDetailed } from '../lib/use-invoice-detailed'

import { InvoiceProductsBody } from './components/invoice-products-body'
import { InvoiceStatusesTab } from './components/invoice-statuses-tab'
import { InvoiceHistoryTab } from './components/invoice-history-tab'

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
      <section>
        <Text size="lg" style={{ padding: '8px', textAlign: 'center' }} weight="semi">
          Вы действительно хотите удалить счёт{' '}
          <Text size="lg" color="error" weight="semi" tag="span">
            №{values.invoice?.number}
          </Text>
          ?
        </Text>
        <div style={{ gap: 8, display: 'flex' }}>
          <Button full onClick={() => handlers.deleteInvoice()}>
            Подтвердить
          </Button>
          <Button full mode="neutral" onClick={() => handlers.setIsDeleting(false)}>
            Отменить
          </Button>
        </div>
      </section>
    )
  }

  if (values.deletingProduct) {
    return (
      <section style={{ padding: '8px' }}>
        <Text style={{ padding: '8px' }}>
          Вы действительно хотите удалить <br /> продукт{' '}
          <Text size="lg" color="error" weight="semi" tag="span">
            {values.deletingProduct.name}
          </Text>
          <br />
          из счёта{' '}
          <Text size="lg" color="error" weight="semi" tag="span">
            №{values.invoice?.number}
          </Text>
          ?
        </Text>
        <div style={{ gap: 8, display: 'flex' }}>
          <Button
            full
            onClick={() => handlers.deleteInvoiceProduct(values.deletingProduct!.id)}
          >
            Подтвердить
          </Button>
          <Button
            full
            mode="neutral"
            onClick={() => handlers.setDeletingProduct(undefined)}
          >
            Отменить
          </Button>
        </div>
      </section>
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
          editPercent={handlers.editPercent}
          invoice={values.invoice}
          isPaymentError={values.isPaymentError}
          isPriorityError={values.isPriorityError}
          isShipmentError={values.isShipmentError}
        />
      )}

      {values.tab === 'history' && <InvoiceHistoryTab invoiceId={invoiceId} />}
    </ModalEditor>
  )
}
