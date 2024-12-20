import { Text } from '@/shared/ui/text'

export const ManufactureDescriptionTab = () => {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text>
        <Text tag="span" weight="semi">
          Панель производства
        </Text>{' '}
        - раздел для начальников производства и начальников цехов. Здесь расположены
        актуальные данные по текущим заказам, задачам и их прогресс выполнения
      </Text>

      <Text>
        <Text tag="span" weight="semi" breakAll>
          Производственные заказы
        </Text>{' '}
        - формируются из{' '}
        <Text tag="span" weight="semi">
          Счетов
        </Text>{' '}
        переданных в производство. Здесь осуществляется подготовка производства к
        выполнению задачи. Выбор{' '}
        <Text tag="span" weight="semi">
          Продуктов
        </Text>{' '}
        и написание комментариев к производству для каждого начальника цеха
      </Text>
    </main>
  )
}
