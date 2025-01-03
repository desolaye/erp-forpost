import { Text } from '@/shared/ui/text'

export const TooltipTitle = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Text>Для успешного сканирования выполните следующие этапы:</Text>
      <Text>1) Отсканируйте QR подгруппы товара</Text>
      <Text>2) Отсканируйте штрихкод с номенклатурой товара</Text>
      <Text>3) Отсканируйте штрихкод с количеством товара или введите вручную</Text>
      <Text>4) Для каждого следующего товара повторите пункты 1-3</Text>
      <Text size="sm">
        При открытии окна сканирования, поле с QR подгруппы выделяется автоматически
      </Text>
      <Text weight="semi" size="sm">
        Важно: при следовании пунктов 1-4 все действия на сайте выполняются автоматически.
        Остается только сканировать согласно пунктам
      </Text>
    </div>
  )
}
