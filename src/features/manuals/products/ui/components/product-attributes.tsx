import { Loader } from '@/shared/ui/loader'
import { Button } from '@/shared/ui/button'
import { Select } from '@/shared/ui/select'

import { useProductAttributes } from '../../lib/use-product-attributes'

type ProductAttributesProps = {
  productId: string
}

export const ProductAttributes = (props: ProductAttributesProps) => {
  const { handlers, values } = useProductAttributes(props)

  if (values.isLoading) return <Loader />

  return (
    <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
      <section style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
        {values.currentAttrs &&
          values.attrAll.map((v) => (
            <Select
              key={v.id}
              defaultValue={
                values.currentAttrs?.find((val) => val.name === v.name)?.options
              }
              options={v.options}
              onChange={(s) => handlers.selectAttr(v.name, v.id, s)}
              label={v.name}
              isMulti
            />
          ))}
      </section>

      <Button full onClick={handlers.saveAttrs}>
        Сохранить
      </Button>
    </div>
  )
}
