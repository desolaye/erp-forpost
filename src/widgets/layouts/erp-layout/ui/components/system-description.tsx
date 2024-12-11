import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

type SystemDescriptionProps = {
  onClose?: () => void
}

export const SystemDescription = (props: SystemDescriptionProps) => {
  const { onClose } = props

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 16,
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text weight="semi" size="xl">
          Описание системы
        </Text>
        <Button mode="neutral" onClick={onClose}>
          Закрыть
        </Button>
      </div>

      <Text>
        В ERP системе присутсвует несколько актуальных разделов, с которыми можно
        работать. Доступ к разделам осуществляется через{' '}
        <Text tag="span" weight="semi">
          "Меню"
        </Text>{' '}
        в левом верхнем углу экрана
      </Text>

      <br />

      <Text weight="semi" size="lg">
        Описание разделов:
      </Text>

      <Text>
        1.{' '}
        <Text tag="span" weight="semi">
          Справочники
        </Text>{' '}
        - представляет из себя справочную информацию о различных сущностях, с которыми
        можно работать в других разделах
      </Text>

      <Text>
        1.1.{' '}
        <Text tag="span" weight="semi">
          Контрагенты
        </Text>{' '}
        - это третьи лица, с которыми компания ведет работу
      </Text>

      <Text>
        1.2.{' '}
        <Text tag="span" weight="semi">
          Продукты
        </Text>{' '}
        - это изделия, производимые компанией на продажу
      </Text>

      <Text>
        1.3.{' '}
        <Text tag="span" weight="semi">
          Сотрудники
        </Text>{' '}
        - непосредственно сотрудники компании
      </Text>

      <Text>
        1.4.{' '}
        <Text tag="span" weight="semi">
          Технологические карты
        </Text>{' '}
        - инструкции и задачи, необходимые для создания{' '}
        <Text tag="span" weight="semi">
          Продукта
        </Text>
      </Text>

      <Text>
        1.5.{' '}
        <Text tag="span" weight="semi">
          Склады
        </Text>{' '}
        - помещения, в которых размещаются материалы, компоненты и{' '}
        <Text tag="span" weight="semi">
          Продукты
        </Text>
      </Text>

      <br />

      <Text>
        2.{' '}
        <Text tag="span" weight="semi">
          Панель производства
        </Text>{' '}
        - раздел для начальников производства и начальников цехов. Здесь расположены
        актуальные данные по текущим заказам, задачам и их прогресс выполнения
      </Text>

      <Text>
        2.1.{' '}
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

      <br />

      <Text>
        3.{' '}
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
        3.1.{' '}
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
    </section>
  )
}
