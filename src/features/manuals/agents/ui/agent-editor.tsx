import { Tab, Tabs } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { ModalEditor } from '@/shared/ui/modal-editor'
import { Loader } from '@/shared/ui/loader'
import { FileAdd } from '@/shared/ui/file'
import { Button } from '@/shared/ui/button'

import { File } from '@/entities/files'

import { useAgentEditor } from '../lib/use-agent-editor'
import { AgentForm } from './agent-form'

interface IAgentEditorProps {
  id?: string
  onClose?: () => void
}

export const AgentEditor = (props: IAgentEditorProps) => {
  const { id, onClose } = props
  const { values, handlers } = useAgentEditor(props)

  if (values.isLoading) return <Loader />

  return (
    <ModalEditor
      header={
        <>
          <Tabs value={values.tab} onChange={(_, v) => handlers.setTab(v)}>
            <Tab label="Данные" value="data" />
            <Tab disabled={id === 'new'} label="Файлы" value="files" />
          </Tabs>

          <Button
            disabled={id === 'new'}
            mode="secondary"
            style={{ padding: '2px 4px' }}
            onClick={() => handlers.onDelete()}
          >
            <DeleteOutlineIcon />
          </Button>
        </>
      }
    >
      {values.tab === 'data' && (
        <AgentForm
          isPending={values.isPending}
          isError={values.isError}
          name={values.agent?.name || ''}
          onClose={() => onClose?.()}
          onMutate={handlers.onMutate}
        />
      )}

      {values.tab === 'files' && (
        <>
          <FileAdd onLoad={handlers.mutateFile} />
          {values.files?.map((file) => (
            <File title={file.fileName} link={file.id} key={file.id} />
          ))}
        </>
      )}
    </ModalEditor>
  )
}
