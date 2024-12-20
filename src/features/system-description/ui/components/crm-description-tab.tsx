import { Text } from '@/shared/ui/text'

export const CrmDescriptionTab = () => {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text>
        <Text tag="span" weight="semi" breakAll>
          CRM
        </Text>{' '}
        - раздел для менеджеров, начальников производства и предприятия. Содержит метрики
        производства и информацию взаимодействия с{' '}
        <Text tag="span" weight="semi">
          Контрагентами
        </Text>
      </Text>

      <Text>
        <Text tag="span" weight="semi">
          Счета
        </Text>{' '}
        - непосредственно заказы{' '}
        <Text tag="span" weight="semi">
          Контрагентов
        </Text>{' '}
        на производство. Информация по оплате, отгрузкам и выбор{' '}
        <Text tag="span" weight="semi">
          Продуктов
        </Text>{' '}
        для производства
      </Text>
    </main>
  )
}
