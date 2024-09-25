import PlayArrowIcon from '@mui/icons-material/PlayArrow'

interface IProductDevelopToolMenu {
  selectedLength: number
  onComplete: () => void
}

export const productDevelopToolMenu = (props: IProductDevelopToolMenu) => {
  const { onComplete, selectedLength } = props

  return [
    {
      disabled: selectedLength === 0,
      icon: <PlayArrowIcon />,
      onClick: onComplete,
      title: 'Перевести на следующий этап',
    },
  ]
}
