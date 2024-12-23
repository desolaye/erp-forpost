type TableCellBaseType = {
  title: string
  width: number
  maxWidth?: number
}

type TableCellTagType = {
  type: 'tag'
}

type TableCellTextType = {
  type: 'text'
}

type TableCellButtonType = {
  type: 'button'
  onClick: () => void
}

type TableCellTooltipType = {
  type: 'tooltip'
}

export type TableCellConfigType = TableCellBaseType &
  (
    | TableCellTextType
    | TableCellButtonType
    | TableCellTooltipType
    | TableCellTagType
    | TableCellTagType
  )

export type TableRowRecordType<T> = Record<keyof T, TableCellConfigType>
export type TableRowConfigType<T> = [keyof T, TableCellConfigType]
export type TableConfigType<T> = TableRowConfigType<T>[]
