import { Tab, Tabs, Tooltip } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Loader } from '@/shared/ui/loader'

import { GeneralInfoTab } from '@/features/manuals/techcards/general-info-tab'
import { ItemsTab } from '@/features/manuals/techcards/items-tab'
import { OperationsTab } from '@/features/manuals/techcards/operations-tab'

import { useSelectedTechcard } from '../lib/use-selected-techcard'
import { DeleteTechcardConfirm } from './components/delete-techcard-confirm'

import cls from './selected-techcard.module.scss'

type SelectedTechcardProps = {
  cardId: string
  onDelete?: () => void
}

export const SelectedTechcard = (props: SelectedTechcardProps) => {
  const { handlers, values } = useSelectedTechcard(props)

  if (values.isFetching) {
    return (
      <Card style={{ height: '100%', overflow: 'auto' }}>
        <Loader />
      </Card>
    )
  }

  if (values.isDeleting) {
    return (
      <DeleteTechcardConfirm
        number={values.data?.number}
        onDelete={handlers.deleteTechcard}
        onReject={() => handlers.setIsDeleting(false)}
      />
    )
  }

  return (
    <Card style={{ height: '100%', overflow: 'auto' }}>
      <header className={cls.selected_techcard__header}>
        <Tabs
          value={values.selectedTab}
          onChange={(_, tab) => handlers.setSelectedTab(tab)}
        >
          <Tab label="Данные" value="general" />
          <Tab label="Операции" value="operations" />
          <Tab label="Компоненты" value="items" />
        </Tabs>

        <Tooltip title="Удалить техкарту">
          <Button
            mode="secondary"
            style={{ padding: '2px 4px' }}
            onClick={() => handlers.setIsDeleting(true)}
          >
            <DeleteOutlineOutlinedIcon style={{ width: 24, height: 24 }} />
          </Button>
        </Tooltip>
      </header>

      {values.selectedTab === 'general' && (
        <GeneralInfoTab
          cardId={values.data?.id}
          description={values.data?.description || ''}
          number={values.data?.number}
          product={{
            label: values.data?.productName || '',
            value: values.data?.productId || '',
          }}
        />
      )}

      {values.selectedTab === 'operations' && (
        <OperationsTab cardId={values.data?.id} operations={values.data?.operations} />
      )}

      {values.selectedTab === 'items' && (
        <ItemsTab cardId={values.data?.id} items={values.data?.items} />
      )}
    </Card>
  )
}
