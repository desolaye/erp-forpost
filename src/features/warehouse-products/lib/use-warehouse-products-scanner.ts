import { useMutation } from '@tanstack/react-query'
import { FormEvent, KeyboardEvent, useRef, useState } from 'react'

import { postProductScan } from '@/entities/manuals'

type CodeStatus = { status: 'error' | 'success'; barcode: string; productName: string }

interface IPostReq {
  productId: { Id: string; Name: string }
  barcode: string
  quantity: string
}

export const useWarehouseProductsScanner = (storageId: string) => {
  const [currentInput, setCurrentInput] = useState(0)

  const [codesStatus, setCodesStatus] = useState<CodeStatus[]>([])

  const [productId, setProductId] = useState('')
  const [barcode, setBarcode] = useState('')
  const [quantity, setQuantity] = useState('')

  const refProductId = useRef<HTMLInputElement | null>(null)
  const refBarcode = useRef<HTMLInputElement | null>(null)
  const refQuantity = useRef<HTMLInputElement | null>(null)

  const { mutateAsync } = useMutation({
    mutationFn: (data: IPostReq) => postProductScan({ ...data, storageId }),
    onSuccess: (data) => {
      setCodesStatus((prev) => [
        ...prev,
        { status: data.response.status === 200 ? 'success' : 'error', ...data },
      ])
    },
  })

  const submit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    try {
      const json = JSON.parse(productId) as { Id: string; Name: string }

      mutateAsync({ productId: json, barcode, quantity })

      setBarcode('')
      setProductId('')
      setQuantity('')
      setCurrentInput(0)

      refProductId.current?.focus()
    } catch (err) {}
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput !== 2) {
      e.preventDefault()

      if (currentInput === 0) refBarcode.current?.focus()
      if (currentInput === 1) refQuantity.current?.focus()

      setCurrentInput((prev) => prev + 1)
    }

    if (e.key === 'Enter' && currentInput === 2) submit()
  }

  return {
    values: {
      barcode,
      productId,
      quantity,
      codesStatus,
      currentInput,
      refBarcode,
      refProductId,
      refQuantity,
    },
    handlers: {
      submit,
      setBarcode,
      setProductId,
      setQuantity,
      setCurrentInput,
      onKeyDown,
    },
  }
}
