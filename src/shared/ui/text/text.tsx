import { PropsWithChildren } from 'react'
import cn from 'classnames'

import { cls, colorStyle, ITextProps, sizeStyle, weightStyle } from './text.setup'

export const Text = (props: PropsWithChildren<ITextProps>) => {
  const {
    tag: Tag = 'p',
    link,
    size = 'base',
    weight = 'base',
    color = 'black',
    className,
    children,
    hideOverflow,
    breakAll,
    style,
  } = props

  const classes = cn(
    cls.text,
    sizeStyle[size],
    weightStyle[weight],
    colorStyle[color],
    {
      [cls.link]: link,
      [cls.hide_overflow]: hideOverflow,
      [cls.break_all]: breakAll,
    },
    className,
  )

  return (
    <Tag className={classes} style={style}>
      {children}
    </Tag>
  )
}
