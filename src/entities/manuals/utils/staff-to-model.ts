import { RoleType } from '../model/role.schema'
import { StaffType, StaffValidatorType } from '../model/staff.manual'

import { createInitialStaff } from './create-initial-staff'

export const staffToModel = (
  staff?: StaffType,
  roles?: RoleType[],
): StaffValidatorType | undefined => {
  if (staff && roles) {
    console.log('roles', roles)
    console.log('staff', staff)

    const role = roles.find((v) => v.id === staff.role) || { id: '', name: 'Без роли' }
    return { ...staff, role: { label: role.name, value: role.id }, password: '' }
  }

  if (!staff) return createInitialStaff()
}
