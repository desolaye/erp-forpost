import { CSSProperties } from 'react'

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

import { Text } from '../text'
import cls from './empty-card.module.scss'

type EmptyCardProps = {
  style?: CSSProperties
}

export const EmptyCard = (props: EmptyCardProps) => {
  const { style } = props

  return (
    <section className={cls.empty_card} style={style}>
      <SettingsOutlinedIcon fontSize="large" />
      <Text style={{ textAlign: 'center' }}>Похоже, данных не обнаружено</Text>
    </section>
  )
}
