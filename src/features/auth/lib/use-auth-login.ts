import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import Cookies from 'js-cookie'

import { routesPath } from '@/shared/config/routes-path.config'
import { appConstants } from '@/shared/config/constants.config'

import {
  AuthLoginType,
  postAuthLogin,
  SessionContext,
  ZAuthLogin,
} from '@/entities/session'

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
    onSuccess: (data) => {
      if (sessionContext && sessionContext.setSession) {
        const { firstName, lastName } = getValues()
        sessionContext.setSession({ firstName, lastName })
        Cookies.set(appConstants.TOKEN, data.data, { expires: 7 })
        navigate({ to: routesPath.erp.root() })
      }
    },
  })

  const onSubmit: SubmitHandler<AuthLoginType> = (data) => mutateAsync(data)

  return { errors, register, handleSubmit, onSubmit, mutateAsync, isPending, error }
}
