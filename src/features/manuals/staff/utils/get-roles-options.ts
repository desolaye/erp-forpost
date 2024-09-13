import { RoleType } from '@/entities/manuals'

export const getRolesOptions = (roles?: RoleType[]) => {
  return !roles ? [] : roles.map((v) => ({ label: v.name, value: v.id }))
}
