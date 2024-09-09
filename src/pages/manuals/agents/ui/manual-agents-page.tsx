import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'

export const ManualAgentsPage = () => {
  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Card>
        <Text size="2xl" weight="semi">
          Контрагенты
        </Text>
        <div style={{ display: 'flex', gap: 8 }}>
          <Input full placeholder="Поиск" />
          <Button>Добавить</Button>
        </div>
      </Card>

      <Text>Имя</Text>

      <Card>
        <Text>Название1</Text>
      </Card>

      <Card>
        <Text>Название2</Text>
      </Card>

      <Card>
        <Text>Название3</Text>
      </Card>
      <Card>
        <Text>Название4</Text>
      </Card>
    </article>
  )
}
