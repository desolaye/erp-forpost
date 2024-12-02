import { Button } from '@/shared/ui/button'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { Text } from '@/shared/ui/text'

import { WarehouseEditor, useWarehousesPage } from '@/features/manuals/warehouses'
import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { warehousesTableConfig } from '../utils/warehouses-table-config'

const ManualWarehousesPage = () => {
  const { values, handlers } = useWarehousesPage()
  const config = warehousesTableConfig()

  return (
    <PageWrapper>
      <div
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text size="2xl" weight="semi">
          Склады
        </Text>
        <Button onClick={() => handlers.setId('new')} style={{ width: 200 }}>
          Добавить
        </Button>
      </div>

      <SmartTable
        config={config}
        currentPage={0}
        onPageChange={() => {}}
        pageCount={values.totalCount}
        isLoading={values.isPending}
      >
        {values.data?.map((row) => (
          <SmartTableRow
            key={row.storageId}
            config={config}
            row={row}
            onClick={() => handlers.openModal(row)}
          />
        ))}
      </SmartTable>

      <ModalLayout isOpen={Boolean(values.id)} onClose={() => handlers.openModal()}>
        <WarehouseEditor
          warehouse={values.warehouse}
          onClose={() => handlers.openModal()}
        />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ManualWarehousesPage
