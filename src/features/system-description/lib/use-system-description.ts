import { useContext, useMemo, useState } from 'react'

import { ModalLayoutContext } from '@/shared/ui/modal-layout'

export const useSystemDescription = () => {
  const [tab, setTab] = useState('general')
  const context = useContext(ModalLayoutContext)

  const tabsValues = useMemo(() => {
    return [
      { label: 'Общее', value: 'general' },
      { label: 'Справочники', value: 'manuals' },
      {
        label: 'Панель производства',
        value: 'manufacture',
      },
      { label: 'CRM', value: 'crm' },
    ]
  }, [])

  return { tab, setTab, tabsValues, context }
}
