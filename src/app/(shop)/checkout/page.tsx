import Link from "next/link";
import Image from "next/image";
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      
      
      <div className="flex flex-col w-[1000px]">

          <Title title="Verificar orden" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">


            { /* Carrito */}
            <div className="flex flex-col mt-5">
              <span className="text-xl">Ajustar elementos</span>   
              <Link
               href="/cart" className="underline mb-5">
                Editar carrito
              </Link>

           
              { /* Items */}
              {
                productsInCart.map((product) => (
                  <div key={product.slug} className="flex mb-5">
                    <Image
                      src={`/products/${ product.images[0]}`}
                      width={100}
                      height={100}
                      style={{
                        width: "100px",
                        height: "100px", 
                      }}
                      alt={product.title}
                      className="mr-5 rounded"
                    /> 

                    <div>
                      <p>{product.title}</p>
                      <p>${product.price } * 3</p>
                      <p className="font-bold">Subtotal: ${product.price * 3 } </p>
                      
                    </div>
                  </div>
                ))
              }
            </div>
    
            { /* Checkout - Resumen de orden */}
            <div className="bg-white rounded-xl p-7 shadow-xl">

              <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
              <div className="mb-10 ">
                <p className="text-2xl">Julian Mijares</p>
                <p>Calle 123</p>
                <p>Edificio 1</p>
                <p>Piso 1</p>
                <p>Ciudad de México</p>
                <p>CD 123123</p>
                <p>Mexico</p>
              </div>  

              {/* Divider */}
              <div className="w-full h-0.5 bg-gray-200 mb-10 rounded"></div>


               <h2 className="text-2xl mb-2">Resumen de orden</h2>
               <div className="grid grid-cols-2"> 
                 <span>Nº de artículos</span>
                 <span className="text-right">3 artículos</span>

                 <span>Subtotal</span>
                 <span className="text-right">$ 100</span>
                 
                 <span>Impuestos (15%)</span>
                 <span className="text-right">$ 100</span>
                 
                 <span className="mt-5 text-2xl">Total</span>
                 <span className="mt-5 text-2xl text-right">$ 100</span>
                 
                 

               </div>
               <div className="mt-5 mb-2 w-full">
                {/* Disclaimer */}
                <p className="mb-5">
                  <span className="text-xs">
                    Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">politica de privacidad</a> 
                  </span>
                </p>
                <Link
                  href="/orders/123" 
                  className="flex btn-primary justify-center ">
                  Colocar orden               
                </Link>

               </div>
            </div>
          </div> 
      </div>
    </div>
  );
}