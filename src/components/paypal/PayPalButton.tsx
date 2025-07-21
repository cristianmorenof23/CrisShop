"use client"
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js';
import Spinner from '../ui/spinner/Spinner';
import { setTransactionId } from '@/actions/payments/SetTransactionId';
import { paypalCheckPayment } from '@/actions/payments/paypal-payment';


interface Props {
  orderId: string,
  cantidad: number
}

export default function PayPalButton({ orderId, cantidad }: Props) {


  const [{ isPending }] = usePayPalScriptReducer();

  const roundedCantidad = (Math.round(cantidad * 100)) / 100

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {


    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${roundedCantidad}`,
            currency_code: 'USD',
          },
        }
      ]
    })

    //TODO: guardar el id en la orden en la base de datos
    // setTransactionId 
    const { ok } = await setTransactionId(orderId, transactionId)

    if (!ok) {
      throw new Error('No se pudo actualizar la orden')
    }
    return transactionId
  }

  // se dispara cuando el proceso es exitoso
  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {

    console.log('onApprove');


    const details = await actions.order?.capture()
    if (!details) return;

    await paypalCheckPayment(details.id!)
  }


  return (
    <>
      <div className='relative z-0'>
        {isPending ? <Spinner /> : null}
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </div>
    </>
  )
}
