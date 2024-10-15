import { Form } from '@/shared/ui/form'
import { Loader } from '@/shared/ui/loader'
import { EmptyCard } from '@/shared/ui/empty-card'
import { Text } from '@/shared/ui/text'

import { useProductSetStructure } from '../lib/use-product-set-structure'
import ReactSelect from 'react-select'
import cls from './product-structure.module.scss'
import { Controller } from 'react-hook-form'
import { Fragment } from 'react/jsx-runtime'

interface IProductStructureComposeProps {
  productDevelopId: string
  onClose?: () => void
}

export const ProductStructureCompose = (props: IProductStructureComposeProps) => {
  const { productDevelopId, onClose } = props
  const { values, handlers } = useProductSetStructure(productDevelopId, onClose)
  const total = (i: number, index: number) => (values.quantityTotal[i - 1] || 0) + index

  if (values.isPending) return <Loader />
  if (!values.techcardItems && !values.isPending) return <EmptyCard />

  return (
    <Form
      withButtons
      style={{ gap: 12 }}
      onSubmit={handlers.handleSubmit(handlers.onSubmit)}
      onReset={onClose}
    >
      {values.techcardItems?.map((v, i) => (
        <div key={i} className={cls.product_structure}>
          <Text weight="semi" size="lg">
            {v.productName}
          </Text>

          {values.fields
            .slice(values.quantityTotal[i - 1] || 0, values.quantityTotal[i])
            .map((f, index) => (
              <Fragment key={f.id}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Text style={{ width: '40px' }}>{index + 1}.</Text>

                  <div style={{ width: '100%' }}>
                    <Controller
                      control={handlers.control}
                      name={`completedProductsId.${total(i, index)}`}
                      render={({ field }) => (
                        <ReactSelect
                          {...field}
                          options={handlers.getOptions(i)?.map((product) => ({
                            label: `${product.name} - ${product.serialNumber}`,
                            value: product.id,
                          }))}
                          styles={{
                            control: (baseStyles) => ({
                              ...baseStyles,
                              width: '100%',
                              borderColor: !Boolean(
                                values.errors.completedProductsId?.[total(i, index)],
                              )
                                ? 'grey'
                                : '#830000',
                            }),
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {values.errors.completedProductsId?.[total(i, index)] && (
                  <Text size="sm" color="error">
                    Необходимо взять продукт
                  </Text>
                )}
              </Fragment>
            ))}
        </div>
      ))}
    </Form>
  )
}
