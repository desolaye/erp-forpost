import { Form } from '@/shared/ui/form'
import { Loader } from '@/shared/ui/loader'
import { EmptyCard } from '@/shared/ui/empty-card'
import { Text } from '@/shared/ui/text'

import { useProductSetStructure } from '../lib/use-product-set-structure'
import { ProductField } from './components/product-field'

interface IProductStructureComposeProps {
  productDevelopId: string
  onClose?: () => void
}

export const ProductStructureCompose = (props: IProductStructureComposeProps) => {
  const { productDevelopId, onClose } = props
  const { values, handlers } = useProductSetStructure(productDevelopId, onClose)

  if (values.isPending) return <Loader />
  if (!values.techcardItems && !values.isPending) return <EmptyCard />

  return (
    <Form
      withButtons
      style={{ gap: 20 }}
      onSubmit={handlers.handleSubmit(handlers.onSubmit)}
      onReset={onClose}
    >
      {values.techcardItems?.map((v, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <Text weight="semi" size="lg">
            {v.productName}
          </Text>

          {values.fields
            .slice(values.quantityTotal[i - 1] || 0, values.quantityTotal[i])
            .map((f, index) => (
              <ProductField
                key={f.id}
                control={handlers.control}
                index={index}
                name={`completedProductsId.${(values.quantityTotal[i - 1] || 0) + index}`}
                productId={v.productId}
                isError={Boolean(values.errors.completedProductsId)}
              />
            ))}
        </div>
      ))}
    </Form>
  )
}
