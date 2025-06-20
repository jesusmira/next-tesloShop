export const revalidate = 604800; // 7 dias

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { getProductBySlug } from "@/actions";
import { AddtoCart } from "./ui/AddtoCart";

interface Props {
  params: Promise<{ slug: string }>
}


 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug

  const product = await getProductBySlug(slug);
 
  // fetch post information
  // const post = await fetch(`https://api.vercel.app/blog/${slug}`).then((res) =>
  //   res.json()
  // )
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      // images: [], // https://misitioweb.com/products/image.png
      images: [ `/products/${product?.images[1]}` ],
      // url: `https://teslo.vercel.app/product/${slug}`,
    },
  }
}


export default async function ProductBySlug({ params }: Props) {

  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (

    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
    
      { /* Slideshow */}
      <div className="col-span-1 md:col-span-2 ">

        { /* Mobile Slideshow */}
        <ProductMobileSlideshow 
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />


        { /* Desktop Slideshow */}
        <ProductSlideshow 
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      { /* Details */}
      <div className="col-span-1 px-5 ">
        
       <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">${product.price}</p>

        <AddtoCart product={product} />

        { /* Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          {product.description}
        </p>
        
      </div>
    </div>
  );
}