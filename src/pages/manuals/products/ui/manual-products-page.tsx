import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Table } from '@/shared/ui/table'

import { ProductEditor, useProductsPage } from '@/features/manuals/products'
import { ModalLayout } from '@/widgets/layouts/modal'

export const ManualProductsPage = () => {
  const { values, handlers } = useProductsPage()

  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text size="2xl" weight="semi">
        Продукты
      </Text>

      <Card style={{ flexDirection: 'row' }}>
        <Input full placeholder="Поиск" />
        <Button onClick={() => handlers.handleOpenModal('new')}>Добавить</Button>
      </Card>

      <Card>
        {values.isPending ? (
          <Text>Loading...</Text>
        ) : (
          <Table
            body={
              <>
                {values.products?.map((v) => (
                  <Button
                    key={v.id}
                    mode="table"
                    onClick={() => handlers.handleOpenModal(v.id)}
                    style={{ display: 'flex', gap: 8 }}
                  >
                    <Text style={{ width: '500px', overflow: 'hidden' }}>{v.name}</Text>
                    <Text>{v.version}</Text>
                  </Button>
                ))}
              </>
            }
            header={
              <>
                <Text weight="semi" style={{ width: '500px' }}>
                  Название продукта
                </Text>
                <Text weight="semi">Версия</Text>
              </>
            }
          />
        )}
      </Card>

      <ModalLayout
        isOpen={Boolean(values.productId)}
        onClose={() => handlers.handleOpenModal('')}
      >
        <ProductEditor
          id={values.productId}
          onClose={() => handlers.handleOpenModal('')}
        />
      </ModalLayout>
    </article>
  )
}
