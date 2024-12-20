import { Tab, Tabs } from '@mui/material'

import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'

import { useSystemDescription } from '../lib/use-system-description'

import { GeneralDescriptionTab } from './components/general-description-tab'
import { ManualsDescriptionTab } from './components/manuals-description-tab'
import { ManufactureDescriptionTab } from './components/manufacture-description-tab'
import { CrmDescriptionTab } from './components/crm-description-tab'

import cls from './system-description.module.scss'

export const SystemDescription = () => {
  const { context, setTab, tab, tabsValues } = useSystemDescription()

  return (
    <div className={cls.system_description__wrapper}>
      <section className={cls.system_description}>
        <header className={cls.system_description__header}>
          <Text weight="semi" size="xl">
            Описание системы
          </Text>
          <Button mode="neutral" onClick={context.onClose}>
            Закрыть
          </Button>
        </header>

        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          {tabsValues.map((v) => (
            <Tab key={v.value} label={v.label} value={v.value} />
          ))}
        </Tabs>

        {tab === 'general' && <GeneralDescriptionTab />}
        {tab === 'manuals' && <ManualsDescriptionTab />}
        {tab === 'manufacture' && <ManufactureDescriptionTab />}
        {tab === 'crm' && <CrmDescriptionTab />}
      </section>
    </div>
  )
}
