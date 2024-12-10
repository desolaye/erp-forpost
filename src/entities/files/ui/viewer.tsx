import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Document, Page } from 'react-pdf'

import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import worker from '@/shared/lib/pdfjs-worker'
import cls from './file.module.scss'

type FileViewerProps = {
  file: Blob
  onClose?: () => void
}

export const FileViewer = (props: FileViewerProps) => {
  const { file, onClose } = props
  const [totalPages, setTotalPages] = useState(0)

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages)
  }

  const options = useMemo(
    () => ({
      cMapUrl: '/cmaps/',
      worker,
    }),
    [],
  )

  const handleClose = () => onClose?.()

  return createPortal(
    <article className={cls.file__viewer} onMouseDown={handleClose}>
      <section
        className={cls.file__viewer__body}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Document file={file} options={options} onLoadSuccess={onLoadSuccess}>
          {totalPages &&
            new Array(totalPages)
              .fill(0)
              .map((_, i) => <Page key={i} pageNumber={i + 1} scale={1.33} />)}
        </Document>
      </section>
    </article>,
    document.body,
  )
}
