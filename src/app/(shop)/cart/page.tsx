
import Title from '@/components/ui/title/Title'
import Link from 'next/link'
import ProductsInCart from './ui/ProductsInCart'
import OrdenSuma from './ui/OrdenSuma'



export default function CarritoPage() {


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
            <ProductsInCart />

          </div>

          {/* Checkout  - Resumen de orden*/}
          <div className='bg-white right-2 rounded-xl shadow-xl p-7 h-fit'>
            <h2 className='text-2xl mb-2'>Resumen de Orden</h2>

            <OrdenSuma/>

            <div className='mt-5 w-full mb-2'>
              <Link href="/checkout/address" className='hover:cursor-pointer flex btn-primary justify-center'>Checkout</Link>
            </div>
          </div>




        </div>
      </div>

    </div>
  )
}
