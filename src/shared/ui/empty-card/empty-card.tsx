import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

import { Text } from '../text'
import cls from './empty-card.module.scss'

export const EmptyCard = () => {
  return (
    <section className={cls.empty_card}>
      <SettingsOutlinedIcon fontSize="large" />
      <Text style={{ textAlign: 'center' }}>Похоже, данных не обнаружено</Text>
    </section>
  )
}
