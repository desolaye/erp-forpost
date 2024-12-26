import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { ModalLayout } from '@/shared/ui/modal-layout'

import {
  ProductEditor,
  ProductBarcodeEditor,
  useProductsPage,
} from '@/features/manuals/products'
import { CategoriesCrumbs, CategoriesList } from '@/features/categories'
import { AttributesList } from '@/features/attributes'

import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { productsTableConfig } from '../utils/products-table-config'
import { ProductsPageTooltip } from './components/products-page-tooltip'

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
        <Button mode="neutral" onClick={() => handlers.setAttributesOpen(true)}>
          Атрибуты
        </Button>
      </Card>

      <CategoriesCrumbs onSetCategory={handlers.setCurrentCategory} />

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
        isLoading={values.isLoading}
        withActions
      >
        {values.products?.map((row) => (
          <SmartTableRow
            key={row.id}
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
        isOpen={values.categoriesOpen}
        onClose={() => handlers.setCategoriesOpen(false)}
      >
        <CategoriesList />
      </ModalLayout>

      <ModalLayout
        isOpen={values.attributesOpen}
        onClose={() => handlers.setAttributesOpen(false)}
      >
        <AttributesList />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ManualProductsPage
