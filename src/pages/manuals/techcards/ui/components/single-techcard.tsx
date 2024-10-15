import { Tab, Tabs } from '@mui/material'

import { Loader } from '@/shared/ui/loader'
import { useSingleTechcard } from '@/features/manuals/techcards'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import {
  TechcardFilesInfo,
  TechcardGeneralInfo,
  TechcardItemsInfo,
  TechcardStepsInfo,
} from '@/widgets/techcards'

interface ISingleTechcard {
  id: string
  onDelete?: (id: string) => void
}

export const SingleTechcard = (props: ISingleTechcard) => {
  const { id, onDelete } = props
  const { values, handlers } = useSingleTechcard(id)

  if (values.isPending || !values.data) return <Loader />

  return (
    <PageWrapper style={{ gridColumn: 'span 3 / span 3' }}>
      <Tabs value={values.tab} onChange={(_, v) => handlers.setTab(v)}>
        <Tab label="Общее" value={0} />
        <Tab label="Этапы" value={1} />
        <Tab label="Компоненты" value={2} />
        <Tab label="Файлы" value={3} />
      </Tabs>

      <TechcardGeneralInfo
        description={values.data.description}
        index={0}
        number={values.data.number}
        tab={values.tab}
        onDelete={() => onDelete?.(id)}
      />

      <TechcardStepsInfo id={id} index={1} tab={values.tab} steps={values.data.steps} />
      <TechcardItemsInfo id={id} index={2} tab={values.tab} items={values.data.items} />
      <TechcardFilesInfo
        index={3}
        tab={values.tab}
        files={values.files}
        onFileAdd={handlers.mutateFile}
      />
    </PageWrapper>
  )
}
