import { TechcardFullType } from '@/entities/manuals'
import { Table } from '@/shared/ui/table'

import { StepsTableBody } from './components/steps/steps-table-body'
import { StepsTableHead } from './components/steps/steps-table-head'

interface ITechcardStepsProps {
  tab: number
  index: number
  steps: TechcardFullType['steps']
}

export const TechcardStepsInfo = (props: ITechcardStepsProps) => {
  const { index, steps, tab } = props

  if (tab !== index) return null

  return (
    <Table
      body={<StepsTableBody data={steps} />}
      header={<StepsTableHead />}
      page={1}
      setPage={() => {}}
      totalCount={1}
      isPending={false}
    />
  )
}
