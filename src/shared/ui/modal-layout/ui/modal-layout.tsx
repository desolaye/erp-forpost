import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'

import cls from './modal-layout.module.scss'
import { ModalLayoutContext } from '../lib/use-modal-layout'

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

  const handleClose = () => {
    if (onClose) onClose()
  }

  if (!isOpen) return null

  return createPortal(
    <ModalLayoutContext.Provider value={{ onClose }}>
      <article className={classes} onMouseDown={handleClose}>
        <section onMouseDown={(e) => e.stopPropagation()} className={classesBody}>
          {children}
        </section>
      </article>
    </ModalLayoutContext.Provider>,
    document.body,
  )
}
