"use client"
import { getStockBySlug } from '@/actions/products/get-stock-by-slug'
import { titleFont } from '@/app/config/fonts'
import Spinner from '@/components/ui/spinner/Spinner';
import { useEffect, useState } from 'react';


interface Props {
  slug: string
}

export default function StockLabel({ slug }: Props) {

  const [stock, setStock] = useState(0)
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    getStock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getStock = async () => {
    const inStock = await getStockBySlug(slug)
    setStock(inStock)
    setIsloading(false)
  }

  return (
    <>

      <h2 className={`${titleFont.className} antialiased font-semibold text-lg flex items-center gap-2`}>
        Stock: {isLoading ? <Spinner /> : stock}
      </h2>

    </>
  )
}
