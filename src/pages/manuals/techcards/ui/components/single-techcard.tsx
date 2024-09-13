import { Card } from '@/shared/ui/card'
import { Loader } from '@/shared/ui/loader'
import { Text } from '@/shared/ui/text'

import { useSingleTechcard } from '@/features/manuals/techcards'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'
import { Tab, Tabs } from '@mui/material'
import {
  TechcardGeneralInfo,
  TechcardItemsInfo,
  TechcardStepsInfo,
} from '@/widgets/techcards'

interface ISingleTechcard {
  id: string
}

export const SingleTechcard = (props: ISingleTechcard) => {
  const { values, handlers } = useSingleTechcard(props.id)

  if (values.isPending || !values.data) return <Loader />

  return (
    <PageWrapper style={{ gridColumn: 'span 7 / span 7' }}>
      <Tabs
        value={values.tab}
        onChange={(_, v) => handlers.setTab(v)}
        aria-label="basic tabs example"
      >
        <Tab label="Общее" {...values.a11y[0]} />
        <Tab label="Этапы" {...values.a11y[1]} />
        <Tab label="Ресурсы" {...values.a11y[2]} />
      </Tabs>

      <TechcardGeneralInfo
        description={values.data.description}
        index={0}
        number={values.data.number}
        tab={values.tab}
      />

      <TechcardStepsInfo index={1} tab={values.tab} steps={values.data.steps} />
      <TechcardItemsInfo index={2} tab={values.tab} items={values.data.items} />
    </PageWrapper>
  )
}
