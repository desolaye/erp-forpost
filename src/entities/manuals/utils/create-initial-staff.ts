import { StaffValidatorType } from '@/entities/manuals'

export const createInitialStaff = (): StaffValidatorType => {
  return {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    post: '',
    password: '',
    patronymic: '',
    role: { label: '', value: '' },
    roleId: '',
  }
}
