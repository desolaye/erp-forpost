import { Tab, Tabs } from '@mui/material'

interface IEditorHeaderProps {
  tab: string
  isNew?: boolean
  onTabChange: (tab: string) => void
}

export const EditorHeader = (props: IEditorHeaderProps) => {
  const { tab, isNew, onTabChange } = props

  return (
    <Tabs value={tab} onChange={(_, v) => onTabChange(v)}>
      <Tab label="Данные" value="data" />
      {!isNew && <Tab label="Файлы" value="files" />}
    </Tabs>
  )
}
