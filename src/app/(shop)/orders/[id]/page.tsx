
import { getOrderById } from '@/actions/order/get-order-by-id'
import Title from '@/components/ui/title/Title'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { formatCurrency } from '../../../../utils/formatCurrency'
import PayPalButton from '@/components/paypal/PayPalButton'
import OrderStatus from '@/components/orders/OrderStatus'
import Link from 'next/link'


interface Props {
  params: Promise<{ id: string }>

}

export default async function OrdersById({ params }: Props) {

  const { id } = await params

  const { orden, ok } = await getOrderById(id)

  if (!ok) {
    redirect('/')
  }

  const address = orden?.OrderAddress

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-10'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden numero #${id.split('-').at(-1)}`} />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5'>


            <OrderStatus
              isPaid={orden!.isPaid}
            />


            {/* Items carrito */}
            {
              orden?.OrderItem.map(item => (
                <div key={item.product.slug + '-' + item.size} className='flex mb-5'>
                  <Image
                    src={`/products/${item.product.ProductImage[0].url}`}
                    alt={item.product.title}
                    width={100}
                    height={100}
                    className='mr-5 rounded-lg shadow-md'
                  />

                  <div>
                    <p>{item.product.title}</p>
                    <p>${item.price} x {item.cantidad}</p>
                    <p className='font-bold'>Subtotal: {formatCurrency(item.price * item.cantidad)}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Checkout  - Resumen de orden*/}
          <div className='bg-white rounded-xl shadow-xl p-7'>

            <h2 className='text-2xl font-bold mb-2'>Direccion de Entrada</h2>
            <div className='mb-10'>
              <p className='text-xl'>{address?.firstName} - {address?.lastName}</p>
              <p className="capitalize">{address?.address}</p>
              <p className="capitalize">{address?.address2}</p>
              <p className="capitalize">{address?.city} - {address?.countryId}</p>
              <p>Codigo Postal : {address?.postalCode}</p>
              <p>Telefono : {address?.phone}</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />
            <h2 className='text-2xl mb-2'>Resumen de Orden</h2>

            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>{orden?.itemsInOrder === 1 ? '1 articulo' : `${orden?.itemsInOrder} articulos`}</span>

              <span>Subtotal</span>
              <span className='text-right'> {formatCurrency(orden!.subTotal)} </span>

              <span>Impuestos (21%)</span>
              <span className='text-right'>{formatCurrency(orden!.tax)}</span>

              <span className='text-2xl mt-5'>Total: </span>
              <span className='text-right mt-5 text-2xl'>{formatCurrency(orden!.total)}</span>
            </div>


            <div className='mt-6'>

              {
                orden?.isPaid ? (

                  <>
                    <OrderStatus
                      isPaid={orden!.isPaid}
                    />
                    <Link href="/" className='font-bold text-center text-xl'>Volver a inicio</Link>
                  </>
                ) : (

                  <PayPalButton
                    cantidad={orden!.total}
                    orderId={orden!.id}
                  />
                )
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
