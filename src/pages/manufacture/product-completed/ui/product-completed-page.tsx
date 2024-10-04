import ReactSelect from 'react-select'

import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Table } from '@/shared/ui/table'

import { useProductCompletedPage } from '@/features/manufacture/product-completed'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { TableHead } from './components/table-head'
import { TableBody } from './components/table-body'
import { searchOptions } from '../utils/product-completed-search-options'

import cls from './product-completed.module.scss'

const ProductCompletedPage = () => {
  const { handlers, values } = useProductCompletedPage()

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

      <Table
        body={<TableBody data={values.products?.completedProducts} />}
        header={<TableHead />}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />
    </PageWrapper>
  )
}

export default ProductCompletedPage
