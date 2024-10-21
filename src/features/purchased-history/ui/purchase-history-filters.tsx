import ReactSelect from 'react-select'

import { Card } from '@/shared/ui/card'
import { usePurchaseHistoryFilters } from '../lib/use-purchased-history-filters'
import { IPurchaseHistoryProps } from '../model/purchase-history-props.interface'
import { Tab, Tabs } from '@mui/material'

export const PurchaseHistoryFilters = (props: IPurchaseHistoryProps) => {
  const { onTabChange, tab } = props
  const config = usePurchaseHistoryFilters(props)

  return (
    <>
      <Tabs value={tab} onChange={onTabChange}>
        <Tab value={0} label="Все" />
        <Tab value={true} label="Закупочные" />
        <Tab value={false} label="Собственные" />
      </Tabs>

      <Card style={{ flexDirection: 'row' }}>
        {config.map((v) => (
          <ReactSelect
            {...v}
            key={v.placeholder}
            isClearable
            styles={{
              container: (base) => ({
                ...base,
                width: '100%',
                zIndex: 2,
              }),
            }}
          />
        ))}
      </Card>
    </>
  )
}
