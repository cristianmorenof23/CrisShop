
import Title from '@/components/ui/title/Title'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]
export default function CheckouPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-10'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verificar Orden' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Ajustar Elementos</span>
            <Link href="/cart" className='hover:underline mb-5 hover:cursor-pointer transition-all'>Editar Carrito </Link>

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
                    <p>${product.price} x 3</p>
                    <p className='font-bold'>Subtotal: ${product.price * 3}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Checkout  - Resumen de orden*/}
          <div className='bg-white rounded-xl shadow-xl p-7'>

            <h2 className='text-2xl font-bold mb-2'>Direccion de Entrada</h2>
            <div className='mb-10'>
              <p className='text-xl'>Cristian Moreno</p>
              <p>Ramon oro 2587</p>
              <p>Barrio Patricios</p>
              <p>Corodba Capital</p>
              <p>Codigo Postal : 12213</p>
              <p>Telefono : 3513336631</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />
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
              <p className='mb-5'>
                <span className='text-xs'>
                  Al hacer click en &quot;Colocar Orden&quot;, acepta nuestros <Link href="#" className='underline'>terminos y condiciones</Link> y <Link href="#" className='underline'>politica de privacidad</Link>
                </span>
              </p>
              <Link href="/orders/231" className='hover:cursor-pointer flex btn-primary justify-center'>Colocar Orden</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
