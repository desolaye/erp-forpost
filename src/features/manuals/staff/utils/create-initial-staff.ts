import { StaffType, StaffValidatorType } from '@/entities/manuals'

export const createInitialStaff = (staff?: StaffType): StaffValidatorType => {
  return {
    email: staff?.email || '',
    firstName: staff?.firstName || '',
    lastName: staff?.lastName || '',
    phoneNumber: staff?.phoneNumber || '',
    post: staff?.post || '',
    password: '',
    role: {
      value: '',
      label: staff?.role || '',
    },
  }
}
