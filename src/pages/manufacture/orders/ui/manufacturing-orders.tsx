import ReactSelect from 'react-select'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { ModalLayout } from '@/shared/ui/modal-layout'

import { getManufacturingOrderOptions } from '@/entities/manufacture/utils/get-manufacturing-order-statuses-options'
import { getManufacturePriorityOptions } from '@/entities/manufacture/utils/get-manufacture-priority-options'
import { manufacturingOrderStatusToText } from '@/entities/manufacture/utils/manufacturing-order-status-to-text'
import { priorityStatusToText } from '@/entities/manufacture/utils/priority-status-to-text'

import {
  ManufacturingOrderDetailed,
  useManufacturingOrdersPage,
} from '@/features/manufacture/orders'

import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { manufacturingOrdersTableConfig } from '../utils/manifacturing-orders-table.config'

const ManufacturingOrdersPage = () => {
  const { handlers, values } = useManufacturingOrdersPage()
  const config = manufacturingOrdersTableConfig()

  return (
    <PageWrapper title="Производственные заказы">
      <Card>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            mode="neutral"
            onClick={() => handlers.setIsFiltersOpen((prev) => !prev)}
            style={{ padding: '2px 8px' }}
          >
            <FilterAltIcon />
          </Button>
          <Input
            full
            placeholder="Поиск по номеру заказа"
            value={values.search}
            onChange={(e) => handlers.setSearch(e.target.value)}
          />
        </div>

        {values.isFiltersOpen && (
          <div style={{ zIndex: '10', display: 'flex', gap: 8 }}>
            <ReactSelect
              placeholder="Статус заказа"
              options={getManufacturingOrderOptions()}
              onChange={(val) => handlers.setOrderStatus(val?.value)}
              className="full"
              isClearable
            />
            <ReactSelect
              placeholder="Приоритет заказа"
              options={getManufacturePriorityOptions()}
              onChange={(val) => handlers.setPriority(val?.value)}
              isClearable
              className="full"
            />
          </div>
        )}
      </Card>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
      >
        {values.orders?.map((row) => (
          <SmartTableRow
            key={row.id}
            row={{
              ...row,
              manufacturingOrderStatus: manufacturingOrderStatusToText(
                row.manufacturingOrderStatus,
              ),
              priority: priorityStatusToText(row.priority),
            }}
            onClick={() => handlers.setSelectedOrderId(row.id)}
          />
        ))}
      </SmartTable>

      <ModalLayout
        isOpen={typeof values.selectedOrderId === 'string'}
        onClose={() => handlers.setSelectedOrderId(undefined)}
      >
        <ManufacturingOrderDetailed orderId={values.selectedOrderId || ''} />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ManufacturingOrdersPage
