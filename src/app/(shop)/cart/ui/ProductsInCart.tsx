"use client"
import CantidadSelector from '@/components/product/cantidad-selector/CantidadSelector'
import Spinner from '@/components/ui/spinner/Spinner'
import { useCartStore } from '@/store/cart/cart-store'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProductsInCart() {

  const [loaded, setLoades] = useState(false)
  const { cart, updateProductCantidad, deleteProductCart } = useCartStore()


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
              <Link href={`/product/${product.slug}`} className='hover:cursor-pointer hover:underline transition-all'>
                <p>{product.title}</p>
              </Link>
              <p>${product.price}</p>

              <CantidadSelector
                cantidad={product.cantidad}
                onCantidadChange={(newCantidad) => updateProductCantidad(product, newCantidad)}
              />

              <button
                onClick={() => deleteProductCart(product)}
                className='hover:cursor-pointer hover:text-red-500 transition-all mt-2'>Eliminar</button>
            </div>
          </div>
        ))
      }
    </>
  )
}
