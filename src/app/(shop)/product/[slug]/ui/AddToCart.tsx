"use client"

import CantidadSelector from '@/components/product/cantidad-selector/CantidadSelector'
import SideSelector from '@/components/product/size-selector/SideSelector'
import StockLabel from '@/components/product/stock-label/StockLabel'
import { Product, ProductCart, Size } from '@/interfaces/product.interface'
import { useCartStore } from '@/store/cart/cart-store'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  product: Product
}


export default function AddToCart({ product }: Props) {

  // importar funcion del store de zustand
  const { addProductToCart } = useCartStore()

  const [size, setSize] = useState<Size | undefined>();
  const [cantidad, setCantidad] = useState<number>(1);


  const addToCart = () => {
    if (!size) {
      toast.error("Debes seleccionar un talle")
      return;
    }

    const cartProduct: ProductCart = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      cantidad: cantidad,
      size: size,
      images: product.images[0]
    }
    addProductToCart(cartProduct)
    setSize(undefined)
    setCantidad(1)
    toast.success("Se agrego correctamente un producto")

  }


  return (
    <>
      <StockLabel slug={product.slug} />

      {/* Selector de tallas */}
      <SideSelector
        selectedSize={size}
        availabeSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Selector de cantidad */}
      <CantidadSelector cantidad={cantidad} onCantidadChange={setCantidad} />

      {/* Boton */}
      <button
        onClick={addToCart}
        className="btn-primary my-5 hover:cursor-pointer">Agregar al carrito</button>
    </>
  )
}
