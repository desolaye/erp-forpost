import { GearIcon } from '../icons/gear-icon'
import { Text } from '../text'

import cls from './empty-card.module.scss'

export const EmptyCard = () => {
  return (
    <section className={cls.empty_card}>
      <GearIcon height={64} width={64} />
      <Text style={{ textAlign: 'center' }}>Похоже, данных не обнаружено</Text>
    </section>
  )
}
