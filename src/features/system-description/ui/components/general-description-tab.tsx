import { Text } from '@/shared/ui/text'

export const GeneralDescriptionTab = () => {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text>
        В ERP системе присутсвует несколько актуальных разделов, с которыми можно
        работать. Доступ к разделам осуществляется через{' '}
        <Text tag="span" weight="semi">
          "Меню"
        </Text>{' '}
        в левом верхнем углу экрана
      </Text>
    </main>
  )
}
