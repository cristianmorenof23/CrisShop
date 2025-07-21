import { ProductCart } from "@/interfaces/product.interface";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface State {
  cart : ProductCart[]

  getTotalItem : () => number

  getSumaInformacion : () => 
  {
    subTotal: number;
    tax: number;
    total: number;
    itemInCart: number;
  }

  // metodos para modificar el carrito de compras
  addProductToCart : (product : ProductCart) => void

  updateProductCantidad : (product : ProductCart, cantidad : number) => void

  deleteProductCart : (product : ProductCart) => void

  clearCartStore : () => void
}



// store de zustand
export const useCartStore = create<State>()(
  
  persist(
      (set, get) => ({
  cart : [],

  getTotalItem : () => {
    const {  cart } = get()
    return cart.reduce( (total, item) => total + item.cantidad , 0 )
  },

  getSumaInformacion : () => {
    const { cart } = get()
    const subTotal = cart.reduce( (subTotal, product) => (product.cantidad * product.price ) + subTotal  ,0)

    const tax = subTotal * 0.21;
    const total = subTotal + tax
    const itemInCart = cart.reduce( (total, item) => total + item.cantidad , 0 )

    return {
      subTotal, tax, total, itemInCart
    }


  },

  updateProductCantidad : (product : ProductCart, cantidad : number) => {
    const { cart } = get()

    const updateCart  = cart.map((item ) => {
      if (item.id === product.id && item.size === product.size) {
        return {
          ...item,
          cantidad
        }
      }
      return item
    })
    set({cart  : updateCart})
  },

  deleteProductCart : (product : ProductCart) => {
    const { cart } = get()
    const deleteProduct = cart.filter( item => !(item.id === product.id && item.size === product.size))
    set({cart : deleteProduct})
    toast.success("Se elimino correctamente")
  },

  clearCartStore : () => {
    set({cart : []})
  },

  addProductToCart : (product : ProductCart) => {
    const { cart } = get()

    // 1. revisar si el producto existe en el carrito con el talle seleccionado
    const productInCart = cart.some(
      (item) => item.id === product.id && item.size === product.size
    )

    // sino existe el producto en el carrito, lo insertamos
    if( !productInCart ) {
      set( { cart : [...cart, product] })
      return
    }

    // 2. se que el producto existe por talle, hay que incrementar
    const updateCartProducts = cart.map( (item) => {
      if (item.id === product.id && item.size === product.size){
        return { ...item, cantidad : item.cantidad + product.cantidad }
      }
      return item
    } )
    set({cart  : updateCartProducts})
  }
}), 
    {
      name : 'shopping-cart'
    }
  )

)