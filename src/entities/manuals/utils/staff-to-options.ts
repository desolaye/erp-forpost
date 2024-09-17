import { StaffType } from '../model/staff.manual'

export const staffToOptions = (staff?: StaffType[]) => {
  return !staff
    ? []
    : staff.map((v) => ({ label: `${v.lastName} ${v.firstName}`, value: v.id }))
}
