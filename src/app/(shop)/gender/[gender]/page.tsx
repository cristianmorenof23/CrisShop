export const revalidate = 60; // 60 segundos

import { getPaginaterProductsWithImages } from "@/actions/products/product-pagination";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Pagination from "@/components/ui/pagination/Pagination";
import Title from "@/components/ui/title/Title";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";


export const dynamic = 'force-static';


interface Props {
  params: Promise<{ gender: string }>
  searchParams: Promise<{ page?: string }>
}


export default async function CartPage({ params, searchParams }: Props) {

  const { gender } = await params;

  const page = parseInt((await searchParams).page ?? '1');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { products, currentPage, totalPages } = await getPaginaterProductsWithImages({ page, gender: gender as Gender });



  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labelGender: Record<string, string> = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
    'unisex': 'Unisex',
  }

  // if (id === 'kids') {
  //   notFound();
  // }

  return (
    <>
      <>
        <Title title={`Articulos de ${labelGender[gender]}`} subtitle="Todos los productos" className="mb-2" />

        <ProductGrid products={products.map(product => ({
          ...product,
          description: product.description ?? ''
        }))} />

        <Pagination totalPages={totalPages} />
      </>
    </>

  )
}
