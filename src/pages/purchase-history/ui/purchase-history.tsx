import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import {
  PurchaseHistoryFilters,
  usePurchaseHistoryPage,
} from '@/features/purchased-history'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { purchaseTableConfig } from '../utils/purchase-history-table.config'

const PurchaseHistoryPage = () => {
  const { handlers, values } = usePurchaseHistoryPage()
  const config = purchaseTableConfig(values.tab)

  return (
    <PageWrapper title="История закупок">
      <PurchaseHistoryFilters
        onSetMonth={handlers.setMonth}
        onSetYear={handlers.setYear}
        onSetDay={handlers.setDays}
        onTabChange={(_, v) => handlers.setTab(v)}
        tab={values.tab}
      />

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
      >
        {values.purchases?.map((row) => <SmartTableRow key={row.id} row={row} />)}
      </SmartTable>
    </PageWrapper>
  )
}

export default PurchaseHistoryPage
