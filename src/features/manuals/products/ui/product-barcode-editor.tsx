import { getProductBarcode, putUpdateProductBarcode } from '@/entities/manuals'
import { Card } from '@/shared/ui/card'
import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Loader } from '@/shared/ui/loader'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { Text } from '@/shared/ui/text'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'

interface IProductBarcodeEditorProps {
  productId?: string
  onClose?: () => void
}

export const ProductBarcodeEditor = (props: IProductBarcodeEditorProps) => {
  const { productId, onClose } = props

  const queryClient = useQueryClient()

  const [barcode, setBarcode] = useState('')

  const { data, isPending } = useQuery({
    queryKey: ['barcode', productId],
    queryFn: () => getProductBarcode(productId || ''),
  })

  const { mutateAsync } = useMutation({
    mutationFn: (barcode: string) => putUpdateProductBarcode(productId || '', barcode),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['barcode', productId] }),
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutateAsync(barcode || '').then(() => setBarcode(''))
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
            <div style={{ maxHeight: '200px' }}>
              {isPending ? <Loader /> : <img src={data} alt="Изображение отсутствует" />}
            </div>
            <Input
              label="Введите штрих-код"
              autoFocus
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
          </Form>
        }
        header={<Text>Штрих-код/QR продукта</Text>}
      />
    </Card>
  )
}
