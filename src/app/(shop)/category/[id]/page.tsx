import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  };
}


export default async function  ({ params }: Props) {

  const { id } = await params;
 

  // if ( id === 'kids') notFound();
  const seedProducts = initialData.products.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    'men': ' para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }

  return (
     <>
        <Title 
          title={ ` Articulos de ${labels[id]}` }
          subtitle="Todos los productos"
          className="mb-2"
        />

        <ProductGrid products={seedProducts} />

      </>
  );
}