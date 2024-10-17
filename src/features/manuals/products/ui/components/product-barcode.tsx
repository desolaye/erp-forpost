interface IProductBarcodeProps {
  image: string
  idx: number
}

export const ProductBarcode = (props: IProductBarcodeProps) => {
  const { image, idx } = props

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <p>{idx}.</p>
      <img
        style={{ maxHeight: '200px', maxWidth: '350px' }}
        src={image}
        alt="Изображение отсутствует"
      />
    </div>
  )
}
