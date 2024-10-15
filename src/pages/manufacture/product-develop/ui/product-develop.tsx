import ReactSelect from 'react-select'

import { ToolMenu } from '@/shared/ui/tool-menu'
import { Text } from '@/shared/ui/text'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import {
  ProductStructureCompose,
  useProductDevelopPage,
} from '@/features/manufacture/product-develop'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { productDevelopToolMenu } from '../utils/product-develop-tool-menu'
import { searchOptions } from '../utils/product-develop-search-options'
import { productDevelopTableConfig } from '../utils/product-develop-table.config'
import { ProductDevelopTooltip } from './components/product-develop-tooltip'

import cls from './product-develop.module.scss'
import { ModalLayout } from '@/widgets/layouts/modal'

const ProductDevelop = () => {
  const { handlers, values } = useProductDevelopPage()
  const config = productDevelopTableConfig()

  return (
    <PageWrapper title={values.title}>
      {!values.isPending && values.issueId && (
        <>
          <Text>Этап - {values.issue?.operationName}</Text>
          <Text>Описание - {values.issue?.description}</Text>
          <Text>Исполнитель - {values.issue?.executorName}</Text>
        </>
      )}

      <Card style={{ flexDirection: 'row' }}>
        <Input
          full
          placeholder="Поиск"
          value={values.search}
          onChange={(e) => handlers.setSearch(e.target.value)}
        />
        <ReactSelect
          className={cls.product_develop__select}
          options={searchOptions}
          defaultValue={searchOptions[0]}
          onChange={(val) => handlers.setSearchBy(val?.value || 'productName')}
        />
      </Card>

      {values.isSelectable && (
        <ToolMenu
          tools={productDevelopToolMenu({
            selectedLength: values.selectedIds.length,
            onComplete: handlers.mutateComplete,
          })}
        />
      )}

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
        check={values.tableCheck}
        withActions={values.isComposable}
      >
        {values.products?.map((row) => (
          <SmartTableRow
            key={row.id}
            config={config}
            // @ts-ignore
            row={row}
            check={
              Boolean(values.issueId)
                ? {
                    isChecked: values.selectedIds.includes(row.id),
                    onCheck: () => handlers.selectId(row.id),
                  }
                : undefined
            }
            actions={
              values.isComposable ? (
                <ProductDevelopTooltip
                  onSetStructure={() => handlers.setProductId(row.id)}
                />
              ) : undefined
            }
          />
        ))}
      </SmartTable>

      <ModalLayout
        center
        isOpen={Boolean(values.productId)}
        onClose={() => handlers.setProductId(undefined)}
      >
        <ProductStructureCompose
          productDevelopId={values.productId || ''}
          onClose={() => handlers.setProductId(undefined)}
        />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ProductDevelop
