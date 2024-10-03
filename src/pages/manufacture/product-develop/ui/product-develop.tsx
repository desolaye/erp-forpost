import ReactSelect from 'react-select'

import { Table } from '@/shared/ui/table'
import { ToolMenu } from '@/shared/ui/tool-menu'
import { Text } from '@/shared/ui/text'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'

import { useProductDevelopPage } from '@/features/manufacture/product-develop'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { productDevelopToolMenu } from '../utils/product-develop-tool-menu'
import { searchOptions } from '../utils/product-develop-search-options'

import { DevelopTableHead } from './components/develop-table-head'
import { DevelopTableBody } from './components/develop-table-body'

import cls from './product-develop.module.scss'

const ProductDevelop = () => {
  const { handlers, values } = useProductDevelopPage()

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

      <Table
        body={
          <DevelopTableBody
            data={values.products}
            isIssue={Boolean(values.issueId)}
            isComposable={values.isComposable}
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

export default ProductDevelop
