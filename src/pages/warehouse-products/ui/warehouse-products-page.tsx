import { Table } from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Card } from '@/shared/ui/card'

import { useWarehouseProductsPage } from '@/features/manuals/warehouses'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

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
      </Card>

      <Table
        body={<WarehouseProductsTableBody data={values.products} />}
        header={<WarehouseProductsTableHead />}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />
    </PageWrapper>
  )
}

export default WarehouseProductsPage