import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import DoneIcon from '@mui/icons-material/Done'

interface IProcessesToolMenu {
  selectedLength: number
  onLaunch: () => void
  onComplete: () => void
}

export const processesToolMenu = (props: IProcessesToolMenu) => {
  const { onComplete, onLaunch, selectedLength } = props

  return [
    {
      disabled: selectedLength === 0,
      icon: <PlayArrowIcon />,
      onClick: onLaunch,
      title: 'Запустить',
    },
    {
      disabled: selectedLength === 0,
      icon: <DoneIcon />,
      onClick: onComplete,
      title: 'Завершить',
    },
  ]
}
