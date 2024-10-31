import { useQuery } from '@tanstack/react-query'

import { Text } from '@/shared/ui/text'
import { Card } from '@/shared/ui/card'
import { Loader } from '@/shared/ui/loader'
import { ModalEditor } from '@/shared/ui/modal-editor'

import { getProductBarcode } from '@/entities/manuals'

import { ProductBarcode } from './components/product-barcode'
import cls from './product-barcode-editor.module.scss'

interface IProductBarcodeEditorProps {
  productId?: string
  onClose?: () => void
}

export const ProductBarcodeEditor = (props: IProductBarcodeEditorProps) => {
  const { productId } = props

  const { data, isPending } = useQuery({
    queryKey: ['barcode', productId],
    queryFn: () => getProductBarcode(productId || ''),
  })

  return (
    <Card>
      <ModalEditor
        body={
          <div className={cls.barcode_div}>
            {isPending ? <Loader /> : <ProductBarcode image={data!} />}
          </div>
        }
        header={<Text weight="semi">QR товара</Text>}
      />
    </Card>
  )
}
