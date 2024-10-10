import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { ProductEditor, useProductsPage } from '@/features/manuals/products'
import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { productsTableConfig } from '../utils/products-table-config'

const ManualProductsPage = () => {
  const { values, handlers } = useProductsPage()
  const config = productsTableConfig()

  return (
    <PageWrapper title="Продукты">
      <Card style={{ flexDirection: 'row' }}>
        <Input
          full
          placeholder="Поиск"
          value={values.search}
          onChange={(e) => handlers.setSearch(e.target.value)}
        />
        <Button onClick={() => handlers.openModal('new')}>Добавить</Button>
      </Card>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
      >
        {values.products?.map((row) => (
          <SmartTableRow key={row.id} config={config} row={row} />
        ))}
      </SmartTable>

      <ModalLayout isOpen={Boolean(values.productId)} onClose={handlers.openModal}>
        <ProductEditor id={values.productId} onClose={handlers.openModal} />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ManualProductsPage
