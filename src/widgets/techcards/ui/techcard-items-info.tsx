import { TechcardFullType } from '@/entities/manuals'
import { Table } from '@/shared/ui/table'

import { ItemsTableBody } from './components/items/items-table-body'
import { ItemsTableHead } from './components/items/items-table-head'

interface ITechcardItemsProps {
  tab: number
  index: number
  items: TechcardFullType['items']
}

export const TechcardItemsInfo = (props: ITechcardItemsProps) => {
  const { index, items, tab } = props

  if (tab !== index) return null

  return (
    <Table
      body={<ItemsTableBody data={items} />}
      header={<ItemsTableHead />}
      page={1}
      setPage={() => {}}
      totalCount={1}
      isPending={false}
    />
  )
}
