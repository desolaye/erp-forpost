import { ModalEditor } from '@/shared/ui/modal-editor'
import { FileAdd } from '@/shared/ui/file'
import { Loader } from '@/shared/ui/loader'

import { ManualHeader } from '@/entities/manuals'
import { File } from '@/entities/files'

import { useManufacturingOrdersDetailed } from '../lib/use-manufacturing-orders-detailed'
import { OrderDetailedData } from './components/order-detailed-data'
import { OrderProductDelete } from './components/order-product-delete'

type Props = {
  orderId: string
}

export const ManufacturingOrderDetailed = (props: Props) => {
  const { orderId } = props

  const { values, handlers } = useManufacturingOrdersDetailed(props)

  if (values.isLoading) return <Loader />

  if (values.deletingProduct) {
    return (
      <OrderProductDelete
        productName={values.deletingProduct.productName}
        orderNumber={values.order?.number}
        onDelete={() => handlers.deleteProduct(values.deletingProduct!.id)}
        onReject={() => handlers.setDeletingProduct(undefined)}
      />
    )
  }

  return (
    <ModalEditor
      header={<ManualHeader id={orderId} tab={values.tab} setTab={handlers.setTab} />}
    >
      {values.tab === 'data' && (
        <OrderDetailedData
          products={values.products}
          productsInvoice={values.productsInvoice}
          order={values.order}
          productsAll={values.productsAll}
          onCommentChange={handlers.editComment}
          onProductDelete={handlers.setDeletingProduct}
          onProductCreate={(productId, quantity) =>
            handlers.addProduct({ orderId, productId, quantity })
          }
          onProductEditQuantity={(quantity, id) =>
            handlers.editQuantity({ id, quantity })
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
    </ModalEditor>
  )
}
