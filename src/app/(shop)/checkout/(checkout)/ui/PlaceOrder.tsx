"use client";

import { placeOrderAction } from "@/actions/order/place-order";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAddressStore } from "@/store/address/adress-store";
import { useCartStore } from "@/store/cart/cart-store";
import { formatCurrency } from "@/utils/formatCurrency";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function PlaceOrder() {

  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [islacegingOrder, setIslacegingOrder] = useState(false)


  const { address } = useAddressStore()
  const getSumaInformacion = useCartStore(state => state.getSumaInformacion);
  const { subTotal, tax, total, itemInCart } = getSumaInformacion();
  const cart = useCartStore(state => state.cart);
  const { clearCartStore } = useCartStore()


  useEffect(() => {
    setLoaded(true)
  }, [])

  const placeOrder = async () => {
    setIslacegingOrder(true);

    const productsToOrder = cart.map(product => ({
      productId: product.id,
      cantidad: product.cantidad,
      size: product.size
    }))

    // TODO: server action
    const resp = await placeOrderAction(productsToOrder, address);
    if ( !resp.ok ) {
      setIslacegingOrder(false);
      toast.error(resp.message)
      return
    }

    // Todo salio bien
    // limpiar carrito y redireciconar la persona
    clearCartStore()
    router.replace('/orders/' + resp.orden!)

  }


  if (!loaded) {
    return <Spinner />
  }

  return (
    <>
      <div className='bg-white rounded-xl shadow-xl p-7'>

        <h2 className='text-2xl font-bold mb-2'>Direccion de Entrada</h2>
        <div className='mb-10'>
          <p className='text-xl'>{address.firstName} - {address.lastName}</p>
          <p className="capitalize">{address.address}</p>
          <p className="capitalize">{address.address2}</p>
          <p className="capitalize">{address.city} - {address.country}</p>
          <p>Codigo Postal : {address.postalCode}</p>
          <p>Telefono : {address.phone}</p>
        </div>

        {/* Divider */}
        <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />
        <h2 className='text-2xl mb-2'>Resumen de Orden</h2>

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

        <div className='mt-5 w-full mb-2'>
          <p className='mb-5'>
            <span className='text-xs'>

              Al hacer click en &quot;Colocar Orden&quot;, acepta nuestros <Link href="#" className='underline'>terminos y condiciones</Link> y <Link href="#" className='underline'>politica de privacidad</Link>
            </span>
          </p>

          {/* <p className="text-red-500">Error de creacion</p> */}

          <button
            onClick={placeOrder}
            className={clsx({
              'btn-primary hover:cursor-pointer flex justify-center': !islacegingOrder,
              'disabled bg-slate-200 px-3 py-3 rounded text-white': islacegingOrder
            })}>
            Colocar Orden
          </button>
        </div>
      </div>
    </>
  )
}
