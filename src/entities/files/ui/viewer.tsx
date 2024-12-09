import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { pdfjs, Document, Page } from 'react-pdf'

import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import cls from './file.module.scss'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

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
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    }),
    [],
  )

  const handleClose = () => {
    onClose?.()
  }

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
              .map((_, i) => <Page key={i} pageNumber={i + 1} />)}
        </Document>
      </section>
    </article>,
    document.body,
  )
}
