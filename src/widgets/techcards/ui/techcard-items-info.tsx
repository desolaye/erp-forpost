import { TechcardFullType } from '@/entities/manuals'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { Button } from '@/shared/ui/button'

import { ItemsEditor } from '@/features/manuals/techcards'
import { ModalLayout } from '@/shared/ui/modal-layout'

import { getDisplayValuesItems } from '../utils/get-display-values-items'
import { useItemsInfo } from '../lib/use-items-info'

interface ITechcardItemsProps {
  tab: number
  index: number
  id: string
  items: TechcardFullType['items']
}

export const TechcardItemsInfo = (props: ITechcardItemsProps) => {
  const { index, items, tab, id } = props
  const { values, handlers } = useItemsInfo(items)
  const config = getDisplayValuesItems()

  if (tab !== index) return null

  return (
    <>
      <Button mode="secondary" full onClick={() => handlers.setIsOpen(true)}>
        Добавить компонент
      </Button>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
      >
        {values.items?.map((row) => (
          <SmartTableRow key={row.id} config={config} row={row} />
        ))}
      </SmartTable>

      <ModalLayout isOpen={values.isOpen} onClose={() => handlers.setIsOpen(false)}>
        <ItemsEditor id={id} onClose={() => handlers.setIsOpen(false)} />
      </ModalLayout>
    </>
  )
}
