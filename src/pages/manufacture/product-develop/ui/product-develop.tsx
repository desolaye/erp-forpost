import { Table } from '@/shared/ui/table'

import { useProductDevelopPage } from '@/features/manufacture/product-develop'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { DevelopTableHead } from './components/develop-table-head'
import { DevelopTableBody } from './components/develop-table-body'

export const ProductDevelop = () => {
  const { handlers, values } = useProductDevelopPage()

  return (
    <PageWrapper title="Продукты в разработке">
      <Table
        body={<DevelopTableBody data={values.products} />}
        header={<DevelopTableHead />}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />
    </PageWrapper>
  )
}
