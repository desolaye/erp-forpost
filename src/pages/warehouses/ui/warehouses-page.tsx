import { Text } from '@/shared/ui/text'
import { Table } from '@/shared/ui/table'

import { useWarehousesPage } from '@/features/manuals/warehouses'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { WarehousesTableBody } from './components/warehouses-table-body'

const WarehousesPage = () => {
  const { values, handlers } = useWarehousesPage()

  return (
    <PageWrapper title="Склады">
      <Table
        body={<WarehousesTableBody data={values.data} />}
        header={<Text weight="semi">Название склада</Text>}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />
    </PageWrapper>
  )
}

export default WarehousesPage
