import { Card } from '@/shared/ui/card'

import { NotificationsList } from '@/features/notifications'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'
import { Text } from '@/shared/ui/text'

const HomePage = () => {
  return (
    <PageWrapper title="Главная страница">
      <NotificationsList />
      <Card>
        <Text weight="semi" size="xl">
          Описание системы
        </Text>

        <Text>
          В ERP системе присутсвует несколько актуальных разделов, с которыми можно
          работать. Доступ к разделам осуществляется через{' '}
          <Text tag="span" weight="semi">
            "Меню"
          </Text>{' '}
          в левом верхнем углу экрана
        </Text>

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
      </Card>
    </PageWrapper>
  )
}

export default HomePage
