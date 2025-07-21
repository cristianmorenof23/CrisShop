"use client"
import Spinner from '@/components/ui/spinner/Spinner'
import { useCartStore } from '@/store/cart/cart-store'
import { formatCurrency } from '@/utils/formatCurrency'
import React, { useEffect, useState } from 'react'

export default function OrdenSuma() {

  const [loaded, setLoaded] = useState(false)
  const getSumaInformacion = useCartStore(state => state.getSumaInformacion);
  const { subTotal, tax, total, itemInCart } = getSumaInformacion();


  useEffect(() => {
    setLoaded(true)
  }, [])


  if (!loaded) {
    return <Spinner />
  }


  return (
    <>
      <div className='grid grid-cols-2'>
        <span>No. Productos</span>
        <span className='text-right'>{itemInCart === 1 ? '1 articulo' : `${itemInCart} articulos`}</span>

        <span>Subtotal</span>
        <span className='text-right'> {formatCurrency(subTotal)} </span>

        <span>Impuestos (21%)</span>
        <span className='text-right'>{formatCurrency(tax)}</span>

        <span className='text-2xl mt-5'>Total: </span>
        <span className='text-right mt-5 text-2xl'>{formatCurrency(total)}</span>
      </div>
    </>
  )
}
