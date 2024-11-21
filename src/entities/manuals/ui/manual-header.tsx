import { Tab, Tabs } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Button } from '@/shared/ui/button'

import cls from './manual-header.module.scss'

type ManualHeaderProps = {
  tab: string
  id: string
  setTab: (v: string) => void
  onDelete: () => void
}

export const ManualHeader = (props: ManualHeaderProps) => {
  const { id, onDelete, setTab, tab } = props

  return (
    <section className={cls.manual_header}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Данные" value="data" />
        <Tab disabled={id === 'new'} label="Файлы" value="files" />
        <Tab disabled={id === 'new'} label="Пароль" value="password" />
      </Tabs>

      <Button
        disabled={id === 'new'}
        mode="secondary"
        style={{ padding: '2px 4px' }}
        onClick={() => onDelete()}
      >
        <DeleteOutlineIcon />
      </Button>
    </section>
  )
}
