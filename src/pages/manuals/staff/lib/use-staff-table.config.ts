import { StaffType } from '@/entities/manuals'

export const useStaffTable = () => {
  type DisplayValues = [
    keyof StaffType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<keyof StaffType, { size: string; title: string }> = {
    id: {
      size: '0',
      title: '',
    },
    lastName: {
      size: '250px',
      title: 'Фамилия',
    },
    firstName: {
      size: '150px',
      title: 'Имя',
    },
    patronymic: {
      size: '0',
      title: 'Отчество',
    },
    email: {
      size: '250px',
      title: 'Почта',
    },
    phoneNumber: {
      size: '250px',
      title: 'Номер телефона',
    },
    post: {
      size: '150px',
      title: 'Пост',
    },
    role: {
      size: '0',
      title: 'Роль',
    },
  }

  const getDisplayValues = () => {
    return Object.entries(config).filter(
      ([_, value]) => value.size !== '0',
    ) as DisplayValues
  }

  return { config, getDisplayValues }
}
