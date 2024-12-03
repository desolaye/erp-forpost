import { Tab, Tabs } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Button } from '@/shared/ui/button'

import cls from './manual-header.module.scss'

type ManualHeaderProps = {
  tab: string
  id: string
  tabs?: { label: string; value: string; disabled?: boolean }[]
  setTab: (v: string) => void
  onDelete?: () => void
}

export const ManualHeader = (props: ManualHeaderProps) => {
  const { id, onDelete, setTab, tab, tabs } = props

  return (
    <section className={cls.manual_header}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Данные" value="data" />
        <Tab disabled={id === 'new'} label="Файлы" value="files" />
        {tabs?.map((v) => (
          <Tab key={v.value} disabled={v.disabled} label={v.label} value={v.value} />
        ))}
      </Tabs>

      <Button
        disabled={id === 'new' || !onDelete}
        mode="secondary"
        style={{ padding: '2px 4px' }}
        onClick={() => onDelete?.()}
      >
        <DeleteOutlineIcon />
      </Button>
    </section>
  )
}
