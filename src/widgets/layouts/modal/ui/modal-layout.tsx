import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

import cls from './modal-layout.module.scss'
import cn from 'classnames'

interface IModalLayoutProps {
  onClose?: () => void
  isOpen?: boolean
  center?: boolean
}

export const ModalLayout = (props: PropsWithChildren<IModalLayoutProps>) => {
  const { children, isOpen, center, onClose } = props

  const classes = cn(cls.modal_layout, { [cls.center]: center })

  if (!isOpen) return null

  return createPortal(
    <article className={classes} onClick={() => onClose?.()}>
      <section onClick={(e) => e.stopPropagation()} className={cls.modal_layout__body}>
        {children}
      </section>
    </article>,
    document.body,
  )
}
