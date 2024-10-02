import { ReactNode } from 'react'

import cls from './modal-editor.module.scss'

interface IModalEditorProps {
  header: ReactNode
  body: ReactNode
}

export const ModalEditor = (props: IModalEditorProps) => {
  const { header, body } = props

  return (
    <section className={cls.modal_editor}>
      <header className={cls.modal_editor__header}>{header}</header>
      <main style={{ height: '100%' }}>{body}</main>
    </section>
  )
}
