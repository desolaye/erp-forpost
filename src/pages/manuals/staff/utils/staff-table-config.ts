import { StaffType } from '@/entities/manuals'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const staffTableConfig = () => {
  const config: TableRowRecordType<StaffType> = {
    lastName: {
      type: 'text',
      title: 'Фамилия',
    },
    firstName: {
      type: 'text',
      title: 'Имя',
    },
    patronymic: {
      type: 'text',
      title: 'Отчество',
    },
    email: {
      type: 'text',
      title: 'Почта',
    },
    phoneNumber: {
      type: 'text',
      title: 'Номер телефона',
    },
    post: {
      type: 'text',
      title: 'Должность',
    },
    role: {
      type: 'text',
      title: 'Роль в ERP',
    },
  }

  return Object.entries(config) as TableConfigType<StaffType>
}
