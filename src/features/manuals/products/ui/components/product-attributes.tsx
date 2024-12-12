import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'

import { Loader } from '@/shared/ui/loader'
import { Button } from '@/shared/ui/button'
import { Select } from '@/shared/ui/select'

import { ProductAttribute } from '@/entities/manuals/ui/product-attribute'
import { useProductAttributes } from '../../lib/use-product-attributes'
import { attributesValuesToOptions } from '@/entities/attributes'

type ProductAttributesProps = {
  productId: string
}

export const ProductAttributes = (props: ProductAttributesProps) => {
  const { handlers, values } = useProductAttributes(props)

  if (values.isLoading) return <Loader />

  return (
    <section style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
      {!values.isAddingAttr && (
        <Button mode="secondary" onClick={() => handlers.setIsAddingAttr(true)}>
          + Добавить атрибут
        </Button>
      )}

      {values.isAddingAttr && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Select
            className="full"
            value={values.currentAttr}
            options={values.filteredAttrs}
            onChange={(v) => handlers.setCurrentAttr(v)}
          />
          <Button
            mode="neutral"
            style={{ padding: '2px 4px' }}
            onClick={() => handlers.addAttr(values.currentAttr.value)}
          >
            <EditNoteOutlinedIcon
              style={{
                width: 24,
                height: 24,
              }}
            />
          </Button>
          <Button
            mode="secondary"
            style={{ padding: '2px 4px' }}
            onClick={() => handlers.setIsAddingAttr(false)}
          >
            <DeleteOutlineOutlinedIcon
              style={{
                width: 24,
                height: 24,
              }}
            />
          </Button>
        </div>
      )}

      {values.productAttr?.map((v) => (
        <ProductAttribute
          key={v.id}
          attribute={v}
          attrOptions={attributesValuesToOptions(v.attributeId, values.attrAll)}
          isOpen={values.attrOpened === v.id}
          onOpen={() => handlers.setAttrOpened((prev) => (prev === v.id ? '' : v.id))}
          onDelete={handlers.deleteAttr}
          onDeleteValue={handlers.editAttrValue}
          onAddValue={handlers.editAttrValue}
        />
      ))}
    </section>
  )
}
