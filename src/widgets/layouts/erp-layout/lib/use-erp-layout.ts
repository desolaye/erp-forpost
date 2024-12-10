import { useNavigate } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { routesPath } from '@/shared/config/routes-path.config'
import { publicApi } from '@/shared/api/public-api.config'
import { APP_VARS } from '@/shared/config/app-variables.config'

import { SessionContext, useLocalSession } from '@/entities/session'

export const useErpLayout = () => {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const cookie = Cookies.get(APP_VARS.TOKEN)

  const sessionContext = useContext(SessionContext)
  const { getLocalSession, setLocalSession } = useLocalSession()

  const onAuthFail = () => {
    Cookies.remove(APP_VARS.TOKEN)
    setLocalSession(null)
    navigate({ to: routesPath.login() })
  }

  useEffect(() => {
    if (!cookie) {
      onAuthFail()
    } else {
      publicApi.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${cookie}`
        return config
      })

      publicApi.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err.response?.status === 401) onAuthFail()
          return err
        },
      )

      const session = getLocalSession()

      if (!sessionContext.session && session) {
        sessionContext.setSession({ ...session })
      }
    }
  }, [cookie, sessionContext])

  return {
    isOpen,
    setIsOpen,
  }
}
