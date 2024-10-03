import { Table } from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'

import { useWarehouseProductsPage } from '@/features/manuals/warehouses'
import { WarehouseProductsCreator } from '@/features/warehouse-products'

import { PageWrapper } from '@/widgets/layouts/page-wrapper'
import { ModalLayout } from '@/widgets/layouts/modal'

import { WarehouseProductsTableBody } from './components/warehouse-products-table-body'
import { WarehouseProductsTableHead } from './components/warehouse-products-table-head'

const WarehouseProductsPage = () => {
  const { values, handlers } = useWarehouseProductsPage()

  return (
    <PageWrapper title="Продукты на складе">
      <Card style={{ flexDirection: 'row' }}>
        <Input
          full
          placeholder="Поиск"
          value={values.search}
          onChange={(e) => handlers.setSearch(e.target.value)}
        />
        <Button onClick={() => handlers.setIsModalOpen(true)}>Добавить</Button>
      </Card>

      <Table
        body={<WarehouseProductsTableBody data={values.products} />}
        header={<WarehouseProductsTableHead />}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />

      <ModalLayout
        isOpen={values.isModalOpen}
        onClose={() => handlers.setIsModalOpen(false)}
      >
        <WarehouseProductsCreator
          warehouseId={values.uuid}
          onClose={() => handlers.setIsModalOpen(false)}
        />
      </ModalLayout>
    </PageWrapper>
  )
}

export default WarehouseProductsPage
