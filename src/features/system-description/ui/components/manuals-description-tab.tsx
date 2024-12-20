import { Text } from '@/shared/ui/text'

export const ManualsDescriptionTab = () => {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text>
        <Text tag="span" weight="semi">
          Справочники
        </Text>{' '}
        - представляет из себя справочную информацию о различных сущностях, с которыми
        можно работать в других разделах
      </Text>

      <Text>
        <Text tag="span" weight="semi">
          Контрагенты
        </Text>{' '}
        - это третьи лица, с которыми компания ведет работу
      </Text>

      <Text>
        <Text tag="span" weight="semi">
          Продукты
        </Text>{' '}
        - это изделия, производимые компанией на продажу
      </Text>

      <Text>
        <Text tag="span" weight="semi">
          Сотрудники
        </Text>{' '}
        - непосредственно сотрудники компании
      </Text>

      <Text>
        <Text tag="span" weight="semi">
          Технологические карты
        </Text>{' '}
        - инструкции и задачи, необходимые для создания{' '}
        <Text tag="span" weight="semi">
          Продукта
        </Text>
      </Text>

      <Text>
        <Text tag="span" weight="semi">
          Склады
        </Text>{' '}
        - помещения, в которых размещаются материалы, компоненты и{' '}
        <Text tag="span" weight="semi">
          Продукты
        </Text>
      </Text>
    </main>
  )
}
