import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Table } from '@/shared/ui/table'

import { ProductEditor, useProductsPage } from '@/features/manuals/products'
import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { ProductsTableBody } from './components/products-table-body'
import { ProductsTableHead } from './components/products-table-head'

export const ManualProductsPage = () => {
  const { values, handlers } = useProductsPage()

  return (
    <PageWrapper>
      <Text size="2xl" weight="semi">
        Продукты
      </Text>

      <Card style={{ flexDirection: 'row' }}>
        <Input full placeholder="Поиск" />
        <Button onClick={() => handlers.handleOpenModal('new')}>Добавить</Button>
      </Card>

      <Table
        body={
          <ProductsTableBody data={values.products} onModal={handlers.handleOpenModal} />
        }
        header={<ProductsTableHead />}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />

      <ModalLayout
        isOpen={Boolean(values.productId)}
        onClose={() => handlers.handleOpenModal('')}
      >
        <ProductEditor
          id={values.productId}
          onClose={() => handlers.handleOpenModal('')}
        />
      </ModalLayout>
    </PageWrapper>
  )
}
