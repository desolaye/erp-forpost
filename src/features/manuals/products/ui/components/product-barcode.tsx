interface IProductBarcodeProps {
  image: string
}

export const ProductBarcode = (props: IProductBarcodeProps) => {
  const { image } = props

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
        style={{ maxHeight: '200px', maxWidth: '350px' }}
        src={image}
        alt="Изображение отсутствует"
      />
    </div>
  )
}
