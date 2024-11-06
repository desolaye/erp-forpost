import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { ProductEditor, useProductsPage } from '@/features/manuals/products'
import { ProductBarcodeEditor } from '@/features/manuals/products/ui/product-barcode-editor'
import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { productsTableConfig } from '../utils/products-table-config'
import { ProductsPageTooltip } from './components/products-page-tooltip'
import { CategoriesList } from '@/features/categories'

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
        <Button mode="neutral" onClick={() => handlers.setCategoriesOpen(true)}>
          Категории
        </Button>
      </Card>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
        withActions
      >
        {values.products?.map((row) => (
          <SmartTableRow
            key={row.id}
            config={config}
            row={row}
            onClick={() => handlers.openModal(row.id)}
            actions={
              <ProductsPageTooltip
                onSetBarcode={() => handlers.setProductBarcodeId(row.id)}
              />
            }
          />
        ))}
      </SmartTable>

      <ModalLayout isOpen={Boolean(values.productId)} onClose={handlers.openModal}>
        <ProductEditor id={values.productId} onClose={handlers.openModal} />
      </ModalLayout>

      <ModalLayout
        center
        bodyBg
        isOpen={Boolean(values.productBarcodeId)}
        onClose={() => handlers.setProductBarcodeId('')}
      >
        <ProductBarcodeEditor
          productId={values.productBarcodeId}
          onClose={() => handlers.setProductBarcodeId('')}
        />
      </ModalLayout>

      <ModalLayout
        center
        isOpen={values.categoriesOpen}
        onClose={() => handlers.setCategoriesOpen(false)}
      >
        <CategoriesList />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ManualProductsPage
