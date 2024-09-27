import { useQuery } from '@tanstack/react-query'
import { Control, Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import { Loader } from '@/shared/ui/loader'
import { Text } from '@/shared/ui/text'

import {
  ProductStructureValidatorType,
  getProductsCompletedId,
} from '@/entities/manufacture'

interface IProductFieldProps {
  name: `completedProductsId.${number}`
  index: number
  productId: string
  control: Control<ProductStructureValidatorType>
  isError?: boolean
}

export const ProductField = (props: IProductFieldProps) => {
  const { control, name, productId, isError, index } = props

  const { data, isPending } = useQuery({
    queryFn: () => getProductsCompletedId(productId),
    queryKey: ['completed_products', productId],
  })

  if (!data || isPending) return <Loader />

  return (
    <>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Text style={{ width: '40px' }}>{index + 1}.</Text>

        <div style={{ width: '100%' }}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                options={data.map((product) => ({
                  label: `${product.name} - ${product.serialNumber}`,
                  value: product.id,
                }))}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    width: '100%',
                    borderColor: !isError ? 'grey' : '#830000',
                  }),
                }}
              />
            )}
          />
        </div>
      </div>

      {isError && (
        <Text size="sm" color="error">
          Необходимо взять продукт
        </Text>
      )}
    </>
  )
}
