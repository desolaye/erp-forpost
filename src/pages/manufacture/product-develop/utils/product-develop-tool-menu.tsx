import SkipNextIcon from '@mui/icons-material/SkipNext'

interface IProductDevelopToolMenu {
  selectedLength: number
  onComplete: () => void
}

export const productDevelopToolMenu = (props: IProductDevelopToolMenu) => {
  const { onComplete, selectedLength } = props

  return [
    {
      disabled: selectedLength === 0,
      icon: <SkipNextIcon />,
      onClick: onComplete,
      title: 'Перевести на следующий этап',
    },
  ]
}
