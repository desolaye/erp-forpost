import { StaffType } from '@/entities/manuals'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const staffTableConfig = () => {
  const config: TableRowRecordType<StaffType> = {
    lastName: {
      type: 'text',
      title: 'Фамилия',
      width: 200,
    },
    firstName: {
      type: 'text',
      title: 'Имя',
      width: 200,
    },
    patronymic: {
      type: 'text',
      title: 'Отчество',
      width: 200,
    },
    email: {
      type: 'text',
      title: 'Почта',
      width: 200,
    },
    phoneNumber: {
      type: 'text',
      title: 'Номер телефона',
      width: 200,
    },
    post: {
      type: 'text',
      title: 'Пост',
      width: 200,
    },
    role: {
      type: 'text',
      title: 'Роль',
      width: 200,
    },
    id: {
      type: 'text',
      title: 'id',
      width: 0,
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<StaffType>
}
