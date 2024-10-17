import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'

import { Input } from '@/shared/ui/input'
import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { Text } from '@/shared/ui/text'

import { useWarehouseProductsPage } from '@/features/manuals/warehouses'
import {
  WarehouseProductsCreator,
  WarehouseProductsScanner,
} from '@/features/warehouse-products'

import { PageWrapper } from '@/widgets/layouts/page-wrapper'
import { ModalLayout } from '@/widgets/layouts/modal'

import { warehouseProductsTableConfig } from '../utils/warehouses-table.config'

const WarehouseProductsPage = () => {
  const { values, handlers } = useWarehouseProductsPage()
  const config = warehouseProductsTableConfig()

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
        <Button
          onClick={() => handlers.setIsScanOpen(true)}
          style={{ display: 'flex', gap: 8, minWidth: '175px', alignItems: 'center' }}
        >
          <QrCodeScannerIcon />
          <Text color="white">Сканировать</Text>
        </Button>
      </Card>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
      >
        {values.products?.map((row) => (
          <SmartTableRow key={row.productId + row.quantity} config={config} row={row} />
        ))}
      </SmartTable>

      <ModalLayout
        isOpen={values.isModalOpen}
        onClose={() => handlers.setIsModalOpen(false)}
      >
        <WarehouseProductsCreator
          warehouseId={values.uuid}
          onClose={() => handlers.setIsModalOpen(false)}
        />
      </ModalLayout>

      <ModalLayout
        center
        isOpen={values.isScanOpen}
        onClose={() => handlers.setIsScanOpen(false)}
      >
        <WarehouseProductsScanner storageId={values.uuid} onClose={handlers.endScan} />
      </ModalLayout>
    </PageWrapper>
  )
}

export default WarehouseProductsPage
