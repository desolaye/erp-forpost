import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined'
import { Button } from '@/shared/ui/button'
import { Select } from '@/shared/ui/select'

import { TechcardOperationType } from '@/entities/manuals/techcards'
import { Tooltip } from '@mui/material'
import { splitByNewline } from '@/shared/utils/split-by-newline'
import { Text } from '@/shared/ui/text'

type TechcardOperationProps = {
  operation: TechcardOperationType
  operations: { label: string; value: string }[]

  onDelete?: (id: string) => void
  onOperationEdit?: (operation: { label: string; value: string }) => void
}

export const TechcardOperation = (props: TechcardOperationProps) => {
  const { operation, operations, onDelete, onOperationEdit } = props

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {operation.description && (
        <Tooltip
          title={splitByNewline(operation.description).map((v, i) => (
            <Text key={i}>{v}</Text>
          ))}
        >
          <NotesOutlinedIcon />
        </Tooltip>
      )}

      <Select
        className="full"
        options={operations}
        onChange={(e) => onOperationEdit?.(e)}
        value={{ label: operation.operationName, value: operation.operationId }}
      />

      <Button
        mode="secondary"
        onClick={() => onDelete?.(operation.id)}
        style={{ padding: '2px 4px', minWidth: 24, minHeight: 24 }}
      >
        <DeleteOutlineOutlinedIcon style={{ width: 24, height: 24 }} />
      </Button>
    </div>
  )
}
