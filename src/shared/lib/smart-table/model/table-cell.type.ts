type TableCellBaseType = {
  title: string
  width: number
}

type TableCellTextType = {
  type: 'text'
}

type TableCellButtonType = {
  type: 'button'
  onClick: () => void
}

export type TableCellType = TableCellBaseType & (TableCellTextType | TableCellButtonType)
