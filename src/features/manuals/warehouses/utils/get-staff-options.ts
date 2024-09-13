import { StaffType } from '@/entities/manuals'

export const getStaffOptions = (staff?: StaffType[]) => {
  return !staff
    ? []
    : staff.map((v) => ({ label: `${v.lastName} ${v.firstName}`, value: v.id }))
}
