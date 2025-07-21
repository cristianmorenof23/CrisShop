export const revalidate = 10080;


import { titleFont } from "@/app/config/fonts";
import { notFound } from "next/navigation";
import ProductSlideshow from "../slideshow/ProductSlideshow";
import ProductMobileSlideshow from "../slideshow/ProductMobileSlideshow";
import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { Metadata, ResolvingMetadata } from "next";
import AddToCart from "./ui/AddToCart";


interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false; //


export async function generateMetadata(
  { params }: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {

  const slug = (await params).slug

  // fetch post information
  const product = await getProductBySlug({ slug })

  return {
    title: product?.title ?? 'Producto no Encontrado',
    description: product?.description ?? 'Descripcion no Disponible',
    openGraph: {
      title: product?.title ?? 'Producto no Encontrado',
      description: product?.description ?? 'Descripcion no Disponible',
      images: [`/products/${product?.images[1]}`]
    }
  }
}


export default async function ProductPage({ params }: Props) {

  const { slug } = await params;

  if (!slug) {
    notFound(); // O manejar el error como quieras
  }

  const product = await getProductBySlug({ slug });
  // console.log(product);

  if (!product) {
    notFound();
  }


  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">

        {/* Mobile Slideshow */}
        <ProductMobileSlideshow title={product.title} images={product.images} className="block md:hidden" />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          className="hidden md:block"
          title={product.title} images={product.images} />
      </div>


      {/* Detalles */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart  product={{ ...product, description: product.description ?? '' }} />

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>


      </div>

    </div>
  )
}
