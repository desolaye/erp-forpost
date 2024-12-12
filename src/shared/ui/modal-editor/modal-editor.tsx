import { PropsWithChildren, ReactNode } from 'react'

import cls from './modal-editor.module.scss'

type ModalEditorProps = PropsWithChildren<{ header?: ReactNode; body?: ReactNode }>

export const ModalEditor = (props: ModalEditorProps) => {
  const { header, body, children } = props

  return (
    <section className={cls.modal_editor}>
      {header && <header className={cls.modal_editor__header}>{header}</header>}
      <main className={cls.modal_editor__body}>{children || body}</main>
    </section>
  )
}
