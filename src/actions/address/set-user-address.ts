"use server"

import { Address } from "@/interfaces/address-interface";
import prisma from "@/lib/prisma";


export const setUserAddress = async (address : Address , userId : string) => {
  try {
    const newAddress = await createOrderReplaceAddress(address, userId);
    return {
      ok : true,
      address : newAddress
    }
  } catch (error) {
    console.log(error);
    return {
      ok : false,
      message : 'Error al establecer la dirección del usuario',
    }
  }
}



const createOrderReplaceAddress = async (address : Address , userId : string) => {
  
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where : {
        userId
      }
    })

        console.log('Valor recibido como countryId:', address.country);

    const addressToSave = {
      address : address.address,
      address2 : address.address2,
      countryId : address.country,
      city : address.city,
      firstName : address.firstName,
      lastName : address.lastName,
      phone : address.phone,
      postalCode : address.postalCode,
      userId: userId,
    }

    // Creamos una nueva dirección si no existe una dirección del usuario
    if ( !storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data : addressToSave          
      })
      return newAddress
    }

    // Si ya existe una dirección del usuario, actualizamos la dirección
    const updateAddress = await prisma.userAddress.update({
      where : {userId},
      data : addressToSave
    })
    return updateAddress



  } catch (error) {
    console.log(error);
    throw new Error('Error al crear la dirección de envío');
  }
}