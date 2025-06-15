export const revalidate = 60;

import { getPaginaterProductsWithImages } from "@/actions/products/product-pagination";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Pagination from "@/components/ui/pagination/Pagination";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ page?: string }>

}

export const dynamic = 'force-static';



export default async function HomePage({ searchParams }: Props) {
  const page = parseInt((await searchParams).page ?? '1');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { products, currentPage, totalPages } = await getPaginaterProductsWithImages({ page });


  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid
        products={products.map((product) => ({
          ...product,
          description: product.description ?? "",
        }))}
      />
      <Pagination totalPages={totalPages} />
    </>
  );
}
