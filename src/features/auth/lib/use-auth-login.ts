import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { routesPath } from '@/shared/config/routes-path.config'
import { APP_VARS } from '@/shared/config/app-variables.config'

import {
  AuthLoginType,
  postAuthLogin,
  SessionContext,
  ZAuthLogin,
} from '@/entities/session'
import { getRoleById } from '@/entities/manuals'

export const useAuthLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<AuthLoginType>({ resolver: zodResolver(ZAuthLogin) })

  const sessionContext = useContext(SessionContext)
  const navigate = useNavigate()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: postAuthLogin,
    onSuccess: ({ data: token }) => {
      if (sessionContext && sessionContext.setSession) {
        const { role, nameid }: { role: string; nameid: string } = jwtDecode(token)
        const { firstName, lastName } = getValues()

        getRoleById(role).then(({ data }) => {
          sessionContext.setSession({ firstName, lastName, role: data.name, id: nameid })
          Cookies.set(APP_VARS.TOKEN, token, { expires: 7 })
          navigate({ to: routesPath.erp.root() })
        })
      }
    },
  })

  const onSubmit: SubmitHandler<AuthLoginType> = (data) => mutateAsync(data)

  return { errors, register, handleSubmit, onSubmit, mutateAsync, isPending, error }
}
