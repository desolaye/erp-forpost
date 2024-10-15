import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { WarehouseEditor, useWarehousesPage } from '@/features/manuals/warehouses'
import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { warehousesTableConfig } from '../utils/warehouses-table-config'

const ManualWarehousesPage = () => {
  const { values, handlers } = useWarehousesPage()
  const config = warehousesTableConfig()

  return (
    <PageWrapper title="Склады">
      <Card style={{ flexDirection: 'row' }}>
        <Input
          full
          placeholder="Поиск"
          value={values.search}
          onChange={(e) => handlers.setSearch(e.target.value)}
        />
        <Button onClick={() => handlers.setId('new')}>Добавить</Button>
      </Card>

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
            onClick={() => handlers.openModal(row)}
          />
        ))}
      </SmartTable>

      <ModalLayout isOpen={Boolean(values.id)} onClose={() => handlers.openModal()}>
        <WarehouseEditor
          id={values.id}
          warehouse={values.warehouse}
          onClose={() => handlers.openModal()}
          onSearch={handlers.setSearch}
        />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ManualWarehousesPage
