
import CantidadSelector from '@/components/product/cantidad-selector/CantidadSelector'
import Title from '@/components/ui/title/Title'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]


export default function CarritoPage() {

  if (productsInCart.length > 0) {
    redirect('/empty')
  }


  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-10'>

      <div className='flex flex-col w-[1000px]'>

        <Title title='Carrito' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Agregar mas items</span>
            <Link href="/" className='hover:underline mb-5 hover:cursor-pointer transition-all'>Continua comprado</Link>


            {/* Items carrito */}
            {
              productsInCart.map(product => (
                <div key={product.slug} className='flex mb-5'>
                  <Image
                    src={`/products/${product.images[0]}`}
                    alt={product.title}
                    width={100}
                    height={100}
                    className='mr-5 rounded-lg shadow-md'
                  />

                  <div>
                    <p>{product.title}</p>
                    <p>${product.price}</p>
                    <CantidadSelector cantidad={2} />

                    <button className='hover:cursor-pointer underline transition-all'>Remover</button>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Checkout  - Resumen de orden*/}
          <div className='bg-white right-2 rounded-xl shadow-xl p-7 h-fit'>
            <h2 className='text-2xl mb-2'>Resumen de Orden</h2>

            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>3 articulos</span>

              <span>Subtotal</span>
              <span className='text-right'>$100</span>

              <span>Impuestos (%15)</span>
              <span className='text-right'>$100</span>

              <span className='text-2xl mt-5'>Total: </span>
              <span className='text-right mt-5 text-2xl'>$  200</span>
            </div>

            <div className='mt-5 w-full mb-2'>
              <Link href="/checkout/address" className='hover:cursor-pointer flex btn-primary justify-center'>Checkout</Link>
            </div>
          </div>




        </div>
      </div>

    </div>
  )
}
