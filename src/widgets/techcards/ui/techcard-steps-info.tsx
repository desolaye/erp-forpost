import { Table } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'

import { TechcardFullType } from '@/entities/manuals'

import { StepsEditor } from '@/features/manuals/techcards'
import { ModalLayout } from '@/widgets/layouts/modal'

import { useStepsInfo } from '../lib/use-steps-info'
import { StepsTableBody } from './components/steps/steps-table-body'
import { StepsTableHead } from './components/steps/steps-table-head'

interface ITechcardStepsProps {
  tab: number
  index: number
  id: string
  steps: TechcardFullType['steps']
}

export const TechcardStepsInfo = (props: ITechcardStepsProps) => {
  const { index, steps, tab, id } = props
  const { values, handlers } = useStepsInfo(steps)

  if (tab !== index) return null

  return (
    <>
      <Button mode="secondary" full onClick={() => handlers.setIsOpen(true)}>
        Добавить этап
      </Button>

      <Table
        body={<StepsTableBody data={values.steps} />}
        header={<StepsTableHead />}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
        isPending={false}
      />

      <ModalLayout isOpen={values.isOpen} onClose={() => handlers.setIsOpen(false)}>
        <StepsEditor id={id} onClose={() => handlers.setIsOpen(false)} />
      </ModalLayout>
    </>
  )
}
