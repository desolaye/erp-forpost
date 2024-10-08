import { StaffValidatorType } from '@/entities/manuals'

export const createInitialStaff = (): StaffValidatorType => {
  return {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    post: '',
    password: '',
    role: {
      value: '',
      label: '',
    },
  }
}
