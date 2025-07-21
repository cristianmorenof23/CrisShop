'use server'

import prisma from "@/lib/prisma";


export const setTransactionId = async (orderId : string, transactionId : string) => {
  
  try {
    const orden = await prisma.order.update({
      where : { id : orderId },
      data : {
        transactionId : transactionId
      }
    })

    if ( !orden ){
      return {
        ok : false,
        message : 'No se encontro la orden solicitada'
      }
    }
    return { ok : true }

  } catch (error) {
    console.log(error);
    return {
      ok : false,
      message : 'No se pudo actualizar el id de la transaccion'
    }
  }
}