import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { Button } from '@/shared/ui/button'

import { TechcardFullType } from '@/entities/manuals'

import { StepsEditor } from '@/features/manuals/techcards'
import { ModalLayout } from '@/widgets/layouts/modal'

import { getDisplayValuesSteps } from '../utils/get-display-values-steps'
import { useStepsInfo } from '../lib/use-steps-info'

interface ITechcardStepsProps {
  tab: number
  index: number
  id: string
  steps: TechcardFullType['steps']
}

export const TechcardStepsInfo = (props: ITechcardStepsProps) => {
  const { index, steps, tab, id } = props

  const { values, handlers } = useStepsInfo(steps)
  const config = getDisplayValuesSteps()

  if (tab !== index) return null

  return (
    <>
      <Button mode="secondary" full onClick={() => handlers.setIsOpen(true)}>
        Добавить этап
      </Button>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
      >
        {values.steps?.map((row) => (
          <SmartTableRow key={row.id} config={config} row={row} />
        ))}
      </SmartTable>

      <ModalLayout isOpen={values.isOpen} onClose={() => handlers.setIsOpen(false)}>
        <StepsEditor id={id} onClose={() => handlers.setIsOpen(false)} />
      </ModalLayout>
    </>
  )
}
