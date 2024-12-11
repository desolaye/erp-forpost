import { PropsWithChildren } from 'react'
import cn from 'classnames'

import {
  cls,
  colorStyle,
  ITextProps,
  posStyle,
  sizeStyle,
  weightStyle,
} from './text.setup'

export const Text = (props: PropsWithChildren<ITextProps>) => {
  const {
    tag: Tag = 'p',
    link,
    size = 'base',
    weight = 'base',
    color = 'black',
    pos = 'left',
    className,
    children,
    hideOverflow,
    breakAll,
    noBreak,
    style,
  } = props

  const classes = cn(
    cls.text,
    sizeStyle[size],
    weightStyle[weight],
    colorStyle[color],
    posStyle[pos],
    {
      [cls.link]: link,
      [cls.hide_overflow]: hideOverflow,
      [cls.break_all]: breakAll,
      [cls.no_break]: noBreak,
    },
    className,
  )

  return (
    <Tag className={classes} style={style}>
      {children}
    </Tag>
  )
}
