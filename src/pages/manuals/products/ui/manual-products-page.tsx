import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Table } from '@/shared/ui/table'

import { ProductEditor, useProductsPage } from '@/features/manuals/products'
import { ModalLayout } from '@/widgets/layouts/modal'

import { ProductsTableBody } from './components/products-table-body'
import { ProductsTableHead } from './components/products-table-head'

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
        {values.isPending && <Text>Loading...</Text>}
        {!values.isPending && (
          <Table
            body={
              <ProductsTableBody
                data={values.products}
                onModal={handlers.handleOpenModal}
              />
            }
            header={<ProductsTableHead />}
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
