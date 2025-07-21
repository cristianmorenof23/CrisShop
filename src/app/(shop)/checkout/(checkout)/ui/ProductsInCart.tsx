"use client"
import Spinner from '@/components/ui/spinner/Spinner'
import { useCartStore } from '@/store/cart/cart-store'
import { formatCurrency } from '@/utils/formatCurrency'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ProductsInCart() {

  const [loaded, setLoades] = useState(false)
  const { cart } = useCartStore()


  useEffect(() => {
    setLoades(true)
  }, [])

  if (!loaded) {
    return <Spinner />
  }

  return (
    <>
      {
        cart.map(product => (
          <div key={`${product.slug}-${product.size}`} className='flex mb-5'>
            <Image
              src={`/products/${product.images}`}
              alt={product.title}
              width={100}
              height={100}
              className='mr-5 rounded-lg shadow-md'
            />

            <div>
              <span className='hover:cursor-pointer hover:underline transition-all'>
                {product.size} - {product.title} - {product.cantidad}
              </span>

              <p className='font-bold'>{formatCurrency(product.price * product.cantidad)}</p>


            </div>
          </div>
        ))
      }
    </>
  )
}
