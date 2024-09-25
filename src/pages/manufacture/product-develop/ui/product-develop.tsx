import { Table } from '@/shared/ui/table'
import { ToolMenu } from '@/shared/ui/tool-menu'
import { Text } from '@/shared/ui/text'

import { useProductDevelopPage } from '@/features/manufacture/product-develop'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { productDevelopToolMenu } from '../utils/product-develop-tool-menu'

import { DevelopTableHead } from './components/develop-table-head'
import { DevelopTableBody } from './components/develop-table-body'

export const ProductDevelop = () => {
  const { handlers, values } = useProductDevelopPage()

  return (
    <PageWrapper title={`Продукт в разработке - ${values.issue?.productName}`}>
      {!values.isPending && values.issueId && (
        <>
          <Text>Этап - {values.issue?.operationName}</Text>
          <Text>Описание - {values.issue?.description}</Text>
          <Text>Исполнитель - {values.issue?.executorName}</Text>
        </>
      )}

      {values.issueId && (
        <ToolMenu
          tools={productDevelopToolMenu({
            selectedLength: values.selectedIds.length,
            onComplete: handlers.completeAll,
          })}
        />
      )}

      <Table
        body={
          <DevelopTableBody
            data={values.products}
            isIssue={Boolean(values.issueId)}
            onCheck={handlers.selectId}
          />
        }
        header={<DevelopTableHead isIssue={Boolean(values.issueId)} />}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />
    </PageWrapper>
  )
}
