import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useSearch } from '@/shared/lib/use-search'
import {
  getProductsManual,
  postCreateProduct,
  postProductScan,
  productsToOptions,
  putUpdateProductBarcode,
} from '@/entities/manuals'

interface IHookProps {
  storageId: string
  barcode: string
  status: 'error' | 'success'
}

export const useProductScanned = (props: IHookProps) => {
  const { barcode, storageId, status } = props

  const [tab, setTab] = useState('select')
  const [quantity, setQuantity] = useState('')
  const [productName, setProductName] = useState('')
  const [productPurchased, setProductPurchased] = useState(false)
  const [productSelected, setProductSelected] = useState<{
    label: string
    value: string
  }>()

  const [createdByUser, setCreatedByUser] = useState(false)

  const { filters, setSearch, debouncedSearch } = useSearch('name')

  const { data: products } = useQuery({
    queryFn: () => getProductsManual({ params: { limit: 8, skip: 0 }, filters }),
    queryKey: ['products_all', debouncedSearch],
    enabled: status === 'error',
  })

  const { mutateAsync: mutateProductCreate } = useMutation({
    mutationFn: () =>
      postCreateProduct({ name: productName, purchased: productPurchased }),
  })

  const { mutateAsync: mutateBarcodeAdd } = useMutation({
    mutationFn: (productId: string) =>
      putUpdateProductBarcode(productId, barcode, quantity),
  })

  const { mutateAsync: mutateScanBarcode } = useMutation({
    mutationFn: () => postProductScan(storageId, barcode),
  })

  const tabChange = (v: string) => {
    setQuantity('')
    setSearch('')
    setProductName('')
    setProductSelected(undefined)
    setProductPurchased(false)

    setTab(v)
  }

  const selectProduct = () => {
    if (productSelected) {
      mutateBarcodeAdd(productSelected.value)
        .then(() => mutateScanBarcode())
        .then(() => setCreatedByUser(true))
    }
  }

  const createProduct = () => {
    mutateProductCreate()
      .then((v) => mutateBarcodeAdd(v.data))
      .then(() => mutateScanBarcode())
      .then(() => setCreatedByUser(true))
  }

  return {
    values: {
      quantity,
      tab,
      productName,
      productPurchased,
      createdByUser,
      productSelected,
      products: productsToOptions(products?.data.products),
    },
    handlers: {
      selectProduct,
      setProductSelected,
      setProductName,
      setSearch,
      createProduct,
      tabChange,
      setTab,
      setQuantity,
      setProductPurchased,
      setCreatedByUser,
    },
  }
}
