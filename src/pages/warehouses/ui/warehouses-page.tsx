import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { routesPath } from '@/shared/config/routes-path.config'

import { useWarehousesPage } from '@/features/manuals/warehouses'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { warehousesTableConfig } from '../utils/warehouses-table.config'

const WarehousesPage = () => {
  const { values } = useWarehousesPage()
  const config = warehousesTableConfig()
  const { products, root } = routesPath.erp.warehouses

  return (
    <PageWrapper title="Склады">
      <SmartTable
        config={config}
        currentPage={0}
        onPageChange={() => {}}
        pageCount={values.totalCount}
      >
        {values.data?.map((row) => (
          <SmartTableRow
            key={row.storageId}
            row={row}
            to={products(root(), row.storageId)}
          />
        ))}
      </SmartTable>
    </PageWrapper>
  )
}

export default WarehousesPage
