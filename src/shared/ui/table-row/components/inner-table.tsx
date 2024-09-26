import { isRenderable } from '@/shared/utils/is-renderable'
import { Button } from '../../button'
import { Text } from '../../text'

import cls from '../table-row.module.scss'

interface IInnerTableRowProps<T> {
  width: string
  isLink?: boolean

  data: T
  config: [
    keyof T,
    {
      size: string
      title: string
    },
  ][]
}

export const InnerTableRow = <T,>(props: IInnerTableRowProps<T>) => {
  const { width, isLink, config, data } = props

  return (
    <Button
      mode="table"
      className={cls.table_row}
      style={{
        width: !isLink ? '100%' : width,
      }}
    >
      {config.map(([key, value]) => (
        <Text key={String(key)} style={{ width: value.size }} hideOverflow>
          {isRenderable(data[key]) ? data[key] : ''}
        </Text>
      ))}
    </Button>
  )
}
