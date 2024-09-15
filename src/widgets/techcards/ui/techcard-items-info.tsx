import { TechcardFullType } from '@/entities/manuals'
import { Table } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'

import { ItemsEditor } from '@/features/manuals/techcards'
import { ModalLayout } from '@/widgets/layouts/modal'

import { useItemsInfo } from '../lib/use-items-info'
import { ItemsTableBody } from './components/items/items-table-body'
import { ItemsTableHead } from './components/items/items-table-head'

interface ITechcardItemsProps {
  tab: number
  index: number
  id: string
  items: TechcardFullType['items']
}

export const TechcardItemsInfo = (props: ITechcardItemsProps) => {
  const { index, items, tab, id } = props
  const { values, handlers } = useItemsInfo(items)

  if (tab !== index) return null

  return (
    <>
      <Button mode="secondary" full onClick={() => handlers.setIsOpen(true)}>
        Добавить компонент
      </Button>

      <Table
        body={<ItemsTableBody data={items} />}
        header={<ItemsTableHead />}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
        isPending={false}
      />

      <ModalLayout isOpen={values.isOpen} onClose={() => handlers.setIsOpen(false)}>
        <ItemsEditor id={id} onClose={() => handlers.setIsOpen(false)} />
      </ModalLayout>
    </>
  )
}
