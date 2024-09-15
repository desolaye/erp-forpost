import { Tab, Tabs } from '@mui/material'

import { Loader } from '@/shared/ui/loader'
import { useSingleTechcard } from '@/features/manuals/techcards'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import {
  TechcardGeneralInfo,
  TechcardItemsInfo,
  TechcardStepsInfo,
} from '@/widgets/techcards'

interface ISingleTechcard {
  id: string
}

export const SingleTechcard = (props: ISingleTechcard) => {
  const { id } = props
  const { values, handlers } = useSingleTechcard(id)

  if (values.isPending || !values.data) return <Loader />

  return (
    <PageWrapper style={{ gridColumn: 'span 7 / span 7' }}>
      <Tabs
        value={values.tab}
        onChange={(_, v) => handlers.setTab(v)}
        aria-label="table-techcard"
      >
        <Tab label="Общее" {...values.a11y[0]} />
        <Tab label="Этапы" {...values.a11y[1]} />
        <Tab label="Компоненты" {...values.a11y[2]} />
      </Tabs>

      <TechcardGeneralInfo
        description={values.data.description}
        index={0}
        number={values.data.number}
        tab={values.tab}
      />

      <TechcardStepsInfo id={id} index={1} tab={values.tab} steps={values.data.steps} />
      <TechcardItemsInfo id={id} index={2} tab={values.tab} items={values.data.items} />
    </PageWrapper>
  )
}
