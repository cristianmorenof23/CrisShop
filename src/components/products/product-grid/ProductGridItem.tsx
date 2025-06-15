"use client"
import { Product } from '@/interfaces/product.interface'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface Props {
  product: Product
}

export default function ProductGridItem({ product }: Props) {

  const [display, setDisplayImage] = useState(product.images[0]);

  return (
    <>
      <div className='rounded-md overflow-hidden fade-in flex flex-col'>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={`/products/${display}`}
            className='w-full object-cover rounded'
            alt={product.title}
            width={500}
            height={500}
            onMouseEnter={() => setDisplayImage(product.images[1])}
            onMouseLeave={() => setDisplayImage(product.images[0])}
          />
        </Link>
      </div>

      <div className='p-4 flex flex-col'>
        <Link href={`/product/${product.slug}`} className='hover:text-blue-600 transition-colors'>
          {product.title}
        </Link>
        <span className='font-bold'>${product.price}</span>
      </div>
    </>
  )
}
