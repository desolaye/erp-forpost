import { useMutation } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'

import { postProductScan } from '@/entities/manuals'

type CodeStatus = { status: 'error' | 'success'; barcode: string }

export const useWarehouseProductsScanner = (storageId: string) => {
  const [codesStatus, setCodesStatus] = useState<CodeStatus[]>([])
  const [barcode, setBarcode] = useState('')

  const { mutateAsync } = useMutation({
    mutationFn: (code: string) => postProductScan(storageId, code),
    onSuccess: (data) => {
      if (data.response.status === 200) {
        setCodesStatus((prev) => [...prev, { status: 'success', barcode: data.barcode }])
      } else {
        setCodesStatus((prev) => [...prev, { status: 'error', barcode: data.barcode }])
      }
    },
  })

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutateAsync(barcode)
    setBarcode('')
  }

  return {
    values: {
      barcode,
      codesStatus,
    },
    handlers: {
      submit,
      setBarcode,
    },
  }
}
