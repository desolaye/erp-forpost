import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { routesPath } from '@/shared/config/routes-path.config'

import { useWarehousesPage } from '@/features/manuals/warehouses'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { warehousesTableConfig } from '../utils/warehouses-table.config'

const WarehousesPage = () => {
  const { values, handlers } = useWarehousesPage()
  const config = warehousesTableConfig()
  const { products, root } = routesPath.erp.warehouses

  return (
    <PageWrapper title="Склады">
      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
      >
        {values.data?.map((row) => (
          <SmartTableRow
            key={row.id}
            config={config}
            row={row}
            to={products(root(), row.id)}
          />
        ))}
      </SmartTable>
    </PageWrapper>
  )
}

export default WarehousesPage
