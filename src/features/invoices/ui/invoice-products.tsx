import { Text } from '@/shared/ui/text'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { Loader } from '@/shared/ui/loader'

import { useInvoiceProducts } from '../lib/use-invoice-products'

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
      body={
        values.isLoading ? (
          <Loader />
        ) : (
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {values.products?.map((v, i) => (
              <div key={i}>
                <Text weight="semi">
                  {i + 1}. {v.name}{' '}
                  <Text weight="base" tag="span">
                    в количестве {v.quantity} шт.
                  </Text>
                </Text>
              </div>
            ))}
          </section>
        )
      }
    />
  )
}
