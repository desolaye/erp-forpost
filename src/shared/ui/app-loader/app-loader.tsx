import { Loader } from '../loader'
import { Text } from '../text'

export const AppLoader = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <Text>Грузим страницу...</Text>
      <Loader />
    </div>
  )
}
