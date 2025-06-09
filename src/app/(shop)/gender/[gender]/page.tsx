
export const revalidate = 60;

import { getPaginatedProductsWhithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";


interface Props {
  params: Promise<{ gender: string}>,
  searchParams:Promise<{ page?: string }>
}


export default async function  GenderByPage({ params, searchParams }: Props) {

  const { gender  } = await params;
  
  
  // if ( id === 'kids') notFound();
  // const seedProducts = initialData.products.filter((product) => product.gender === gender);
  const { page }=  await searchParams ;

    const pageNumber = page ? parseInt( page) : 1;
    
  
    const { products, currentPage, totalPages }  = await getPaginatedProductsWhithImages({  
      page:pageNumber, 
      gender: gender as Gender
    });
  
  
  
    if ( products.length === 0 ){
      redirect(`/gender/${gender}`);
    }

  const labels: Record<string, string> = {
    'men': ' para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }

  return (
     <>
        <Title 
          title={ ` Articulos de ${labels[gender]}` }
          subtitle="Todos los productos"
          className="mb-2"
        />

        <ProductGrid products={products} />

        <Pagination totalPages={totalPages} />

      </>
  );
}