import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useRef, useState } from 'react'

import { Text } from '@/shared/ui/text'
import { Card } from '@/shared/ui/card'
import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Loader } from '@/shared/ui/loader'
import { ModalEditor } from '@/shared/ui/modal-editor'

import { getProductBarcode, putUpdateProductBarcode } from '@/entities/manuals'

import cls from './product-barcode-editor.module.scss'
import { ProductBarcode } from './components/product-barcode'

interface IProductBarcodeEditorProps {
  productId?: string
  onClose?: () => void
}

export const ProductBarcodeEditor = (props: IProductBarcodeEditorProps) => {
  const { productId, onClose } = props

  const queryClient = useQueryClient()

  const [barcode, setBarcode] = useState('')
  const [quantity, setQuantity] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  const { data, isPending } = useQuery({
    queryKey: ['barcode', productId],
    queryFn: () => getProductBarcode(productId || ''),
  })

  const { mutateAsync } = useMutation({
    mutationFn: (barcode: string) =>
      putUpdateProductBarcode(productId || '', barcode, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['barcode', productId] }),
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutateAsync(barcode || '').then(() => {
      setBarcode('')
      setQuantity('')
    })
  }

  return (
    <Card>
      <ModalEditor
        body={
          <Form
            withButtons
            saveDisabled={!Boolean(barcode)}
            onSubmit={onSubmit}
            onReset={onClose}
          >
            <div className={cls.barcode_div}>
              {isPending ? <Loader /> : <ProductBarcode image={data!} />}
            </div>
            <Input
              label="Введите штрих-код"
              autoFocus
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  e.preventDefault()
                  ref.current?.focus()
                }
              }}
            />
            <Input
              ref={ref}
              label="Введите количество товара по штрих-коду"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form>
        }
        header={<Text>Штрих-код/QR продукта</Text>}
      />
    </Card>
  )
}
