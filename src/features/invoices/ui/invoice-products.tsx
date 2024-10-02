import { Text } from '@/shared/ui/text'
import { ModalEditor } from '@/shared/ui/modal-editor'

import { useInvoiceProducts } from '../lib/use-invoice-products'
import { InvoiceProductsBody } from './components/invoice-products-body'

interface IInvoiceProductsProps {
  invoiceId: string
}

export const InvoiceProducts = (props: IInvoiceProductsProps) => {
  const { values } = useInvoiceProducts(props)

  return (
    <ModalEditor
      header={
        <Text size="lg" weight="semi">
          Продукты в счёте
        </Text>
      }
      body={<InvoiceProductsBody isLoading={values.isLoading} data={values.products} />}
    />
  )
}
