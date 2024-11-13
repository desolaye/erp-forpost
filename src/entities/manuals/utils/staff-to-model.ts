import { RoleType } from '../model/role.schema'
import { StaffType, StaffValidatorType } from '../model/staff.manual'

import { createInitialStaff } from './create-initial-staff'

export const staffToModel = (
  staff?: StaffType,
  roles?: RoleType[],
): StaffValidatorType => {
  if (staff && roles) {
    const role = roles.find((v) => v.id === staff.roleId) || { id: '', name: 'Без роли' }
    return { ...staff, role: { label: role.name, value: role.id }, password: '' }
  }

  return createInitialStaff()
}
