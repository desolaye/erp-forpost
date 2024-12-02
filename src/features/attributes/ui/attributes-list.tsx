import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { Loader } from '@/shared/ui/loader'
import { Input } from '@/shared/ui/input'

import { useAttributesList } from '../lib/use-attributes-list'

import cls from './attributes-list.module.scss'

export const AttributesList = () => {
  const { handlers, values } = useAttributesList()

  if (values.isLoading) return <Loader />

  if (values.selectedAttr && values.isDeleting) {
    return (
      <section className={cls.attributes_list}>
        <Text pos="center">
          Вы действительно хотите удалить{' '}
          <Text tag="span" color="error" weight="semi">
            {values.selectedAttr.name}
          </Text>
          ?
        </Text>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button full mode="secondary" onClick={handlers.onDelete}>
            Подтвердить
          </Button>
          <Button
            full
            mode="neutral"
            onClick={() => {
              handlers.setIsDeleting(false)
              handlers.setSelectedAttr(undefined)
            }}
          >
            Отменить
          </Button>
        </div>
      </section>
    )
  }

  if (values.selectedAttr) {
    return (
      <section className={cls.attributes_list}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button mode="neutral" onClick={() => handlers.setSelectedAttr(undefined)}>
            К списку
          </Button>
          <Button full onClick={handlers.onMutate}>
            Сохранить атрибут
          </Button>
        </div>

        <Text weight="semi">Название атрибута</Text>
        <Input
          full
          value={values.selectedAttr.name}
          placeholder="Название атрибута"
          onChange={(e) =>
            handlers.setSelectedAttr((prev) => ({ ...prev!, name: e.target.value }))
          }
        />

        <Text weight="semi">Список значений</Text>
        {values.selectedAttr?.values.map((v, i) => (
          <section key={i} className={cls.attributes_list__line}>
            <Input
              full
              value={v}
              placeholder="Значение атрибута"
              onChange={(e) => handlers.editValue(e.target.value, i)}
            />

            <Button
              mode="neutral"
              style={{ padding: '2px 4px' }}
              onClick={() => handlers.deleteValue(i)}
            >
              <DeleteOutlineOutlinedIcon />
            </Button>
          </section>
        ))}

        <Button mode="secondary" onClick={() => handlers.addValue()}>
          + Добавить значение
        </Button>
      </section>
    )
  }

  return (
    <section className={cls.attributes_list}>
      <Text weight="semi">Список атрибутов</Text>

      {values.attributes?.map((v) => (
        <section key={v.id} className={cls.attributes_list__line}>
          <Button full mode="neutral" onClick={() => handlers.setSelectedAttr(v)}>
            {v.name}
          </Button>

          <Button
            mode="secondary"
            style={{ padding: '2px 4px' }}
            onClick={() => {
              handlers.setIsDeleting(true)
              handlers.setSelectedAttr(v)
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </Button>
        </section>
      ))}

      <Button
        mode="secondary"
        onClick={() => handlers.setSelectedAttr({ id: 'new', name: '', values: [] })}
      >
        + Добавить
      </Button>
    </section>
  )
}
