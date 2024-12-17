import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'

import { Loader } from '@/shared/ui/loader'
import { Button } from '@/shared/ui/button'
import { Select } from '@/shared/ui/select'

import { useProductCompabilities } from '../../lib/use-product-compabilities'
import { productsToOptions } from '@/entities/manuals'
import { Text } from '@/shared/ui/text'

type ProductCompabilitiesProps = {
  productId: string
}

export const ProductCompabilities = (props: ProductCompabilitiesProps) => {
  const { handlers, values } = useProductCompabilities(props)

  if (values.isLoading) return <Loader />

  return (
    <section style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
      {!values.isAddingCompability && (
        <Button mode="secondary" onClick={() => handlers.setIsAddingCompability(true)}>
          + Добавить совместимость
        </Button>
      )}

      {values.isAddingCompability && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Select
            className="full"
            value={values.currentCompability}
            options={productsToOptions(values.products)}
            onChange={(v) => handlers.setCurrentCompability(v)}
            onSearch={handlers.onProductSearh}
            isClearable
          />
          <Button
            mode="neutral"
            style={{ padding: '2px 4px' }}
            onClick={() => handlers.onAddCompability(values.currentCompability.value)}
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
            onClick={() => handlers.setIsAddingCompability(false)}
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

      <Text weight="semi">Список совместимостей</Text>

      {values.compabilities?.map((v, i) => (
        <div key={v.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Text>{i + 1}. </Text>
          <Text className="full">{v.parentProductName}</Text>
          <Button
            mode="secondary"
            style={{ padding: '2px 4px' }}
            onClick={() => handlers.onDeleteCompability(v.id)}
          >
            <DeleteOutlineOutlinedIcon
              style={{
                width: 24,
                height: 24,
              }}
            />
          </Button>
        </div>
      ))}
    </section>
  )
}
