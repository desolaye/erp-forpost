import { PropsWithChildren } from 'react'

import cls from './modal-layout.module.scss'
import { createPortal } from 'react-dom'

interface IModalLayoutProps {
  onClose?: () => void
  isOpen?: boolean
}

export const ModalLayout = (props: PropsWithChildren<IModalLayoutProps>) => {
  const { children, isOpen, onClose } = props

  if (!isOpen) return null

  return createPortal(
    <article className={cls.modal_layout} onClick={onClose}>
      <section onClick={(e) => e.stopPropagation()} className={cls.modal_layout__body}>
        {children}
      </section>
    </article>,
    document.body,
  )
}
