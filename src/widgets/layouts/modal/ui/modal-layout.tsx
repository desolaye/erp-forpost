import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

import cls from './modal-layout.module.scss'
import cn from 'classnames'

interface IModalLayoutProps {
  onClose?: () => void
  isOpen?: boolean
  center?: boolean
  bodyBg?: boolean
}

export const ModalLayout = (props: PropsWithChildren<IModalLayoutProps>) => {
  const { children, isOpen, center, bodyBg, onClose } = props

  const classes = cn(cls.modal_layout, { [cls.center]: center })
  const classesBody = cn(cls.modal_layout__body, { [cls.body_bg]: bodyBg })

  if (!isOpen) return null

  return createPortal(
    <article className={classes} onClick={() => onClose?.()}>
      <section onClick={(e) => e.stopPropagation()} className={classesBody}>
        {children}
      </section>
    </article>,
    document.body,
  )
}
