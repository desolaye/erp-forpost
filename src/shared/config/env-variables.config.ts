import { z } from 'zod'

const ZEnvUrl = z.string().url()
const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL

export const API_URL = ZEnvUrl.parse(ENV_URL, {
  errorMap: () => ({
    message: 'Переменная окружения API_URL не найдена.',
  }),
})
