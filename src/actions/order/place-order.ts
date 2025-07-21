"use server"

import { auth } from "@/auth.config"
import { Address } from "@/interfaces/address-interface"
import { Size } from "@/interfaces/product.interface"
import prisma from "@/lib/prisma"



interface ProductsToOrder {
  productId : string
  cantidad : number
  size : Size
}


export const placeOrderAction = async (  productId   : ProductsToOrder[], address : Address) => {

  const session = await auth()
  const userId = session?.user.id
  
  //  verificar sesion de usuario
  if( !userId ) return { ok : false, message : 'No hay usuario autenticado' }


  // obtener informacion de los productos
  // Nota : recuerden ue podemos llevar 2 o mas productos con el mismo id, pero con diferente size
  const products = await prisma.product.findMany({
    where : {
      id : {
        in : productId.map( item => item.productId)
      }
    }
  })

  // calcular los montos de la orden
  const itemsInOrden = productId.reduce(( count, item) => count +  item.cantidad  , 0)

  // los totales de tax, subtotal y total
  const  { subTotal, tax, total } = productId.reduce((totales, item) => {
  
    const productQuantity = item.cantidad
    const product = products.find( p => p.id === item.productId)

    if ( !product ) throw new Error('Producto no encontrado')

    const subTotal = product.price * productQuantity
    totales.subTotal += subTotal
    totales.tax += subTotal * 0.21 // 21% tax
    totales.total += subTotal + (subTotal * 0.21)

    return totales
  }, {subTotal : 0, tax : 0, total : 0})
  console.log({ subTotal, tax, total });




  // crear la transaccion de base de datos

  try {
      const prismaTransaccion = await prisma.$transaction( async (tx) => {

    // 1. Actualizar el stock de los productos
    const updatedProductsPromises = products.map(  ( product  => {

      // Acumular los valores
      const productCantidad = productId.filter(
        p => p.productId === product.id
      ).reduce( ( acc, item) => item.cantidad + acc, 0 )

      if ( productCantidad === 0 ) {
        throw new Error(`${product.id} no tiene cantidad definida`)
      }

      return tx.product.update({
        where : {
          id : product.id
        },
        data : {
          // inStock : product.inStock - productCantidad -- no hacer
          inStock : {
            decrement : productCantidad
          }
        }
      })

    }))

    const updatedProducts = await Promise.all( updatedProductsPromises ) 

    // Verificar valores negativos en la existencia = no hay stock
    updatedProducts.forEach( product => {
      if ( product.inStock < 0 ) {
        throw new Error(`${product.title} no tiene stock suficiente `)
      }
    } )
    


    // 2. Crear la orden- Encabezado - Detalles
    const orden = await tx.order.create({
      data : {
        userId : userId,
        itemsInOrder : itemsInOrden,
        subTotal : subTotal,
        tax : tax,
        total : total,
        isPaid : false, // por defecto no pagada

        OrderItem : {
          createMany : {
            data : productId.map( product => ({
              cantidad : product.cantidad,
              size : product.size,
              productId : product.productId,
              price : products.find( p => p.id === product.productId )?.price ?? 0
            }))
          }
        }
      }
    })

    // 3. Crear la direccion de la orden
const { 
  firstName,
  lastName,
  address: street,
  address2,
  postalCode,
  phone,
  city,
  country
} = address;
    const orderAddress = await tx.orderAddress.create({
      data : {
          firstName,
    lastName,
    address: street,
    address2,
    postalCode,
    phone,
    city,
    countryId: country,
    orderId: orden.id,
      }
    })




    return {
      updatedProducts : updatedProducts,
      orden : orden,
      orderAddress : orderAddress
    }
  })

    return {
      ok : true,
      orden : prismaTransaccion.orden.id,
      prismaTransaccion : prismaTransaccion
    }

  } catch (error) {
    console.log(error);
    return {
      ok : false,
      messagg : 'Hubo un error'
    }
  }

}
