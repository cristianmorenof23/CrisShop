"use server"

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"


export const getOrderById = async (id : string) => {
  const session = await auth()

  if( !session?.user ) {
    return {
      ok : false,
      message : 'Debe estar autenticado'
    }
  } 
      try {
      const orden = await prisma.order.findUnique({
        where : {
          id
        },
        include : {
          OrderAddress : true,
          OrderItem : {
            select : {
              price : true,
              cantidad : true,
              size : true,

              product : {
                select : {
                  title : true,
                  slug : true,
                  ProductImage : {
                    select : {
                      url : true
                    },
                    take : 1
                  }
                }
              }
            }
          }
        }
      })

      if( !orden  ){
        throw new Error(`${id} no existe`)
      }

      if ( session.user.role === 'USER' ) {
        if ( session.user.id !== orden.userId ){
          throw `${id} no es de ese usuario`
        }
      }

      return {
        ok : true,
        orden : orden
      }

    } catch (error) {
      console.log(error);
      return {
        ok : false,
        message : 'Hable con el administrador'
            }
    }
}