import ReactSelect from 'react-select'

import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { useProductCompletedPage } from '@/features/manufacture/product-completed'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { searchOptions } from '../utils/product-completed-search-options'
import { productCompletedTableConfig } from '../utils/product-completed-table.config'

import cls from './product-completed.module.scss'

const ProductCompletedPage = () => {
  const { handlers, values } = useProductCompletedPage()
  const config = productCompletedTableConfig()

  return (
    <PageWrapper title="Склад готовой продукции">
      <Card style={{ flexDirection: 'row' }}>
        <Input
          full
          placeholder="Поиск"
          value={values.search}
          onChange={(e) => handlers.setSearch(e.target.value)}
        />
        <ReactSelect
          className={cls.product_completed__select}
          options={searchOptions}
          defaultValue={searchOptions[0]}
          onChange={(val) => handlers.setSearchBy(val?.value || 'name')}
        />
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
    </PageWrapper>
  )
}

export default ProductCompletedPage
