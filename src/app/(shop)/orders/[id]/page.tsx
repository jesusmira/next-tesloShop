'use server';
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { currencyFormat } from '../../../../utils/CurrencyFormat';
import { PaidOrder } from "@/components/order/paidOrder";


// const productsInCart = [
//   initialData.products[0],
//   initialData.products[1],
//   initialData.products[2],
// ];

interface Props {
  params:Promise<{ id: string }>
}


export default async function OrderByIdPage({ params }: Props) {

  const { id } = await params;

  
  // Todo: Llamar al server action para obtener la orden por id
  const { ok, order } = await  getOrderById(id);

  if (!ok) {
    redirect('/');
  }  

 const address = order!.orderAddress;



  // TODO: Verificar
  // redirect('/);


  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      
      
      <div className="flex flex-col w-[1000px]"> 

          <Title title={`Orden  #${id.split('-').at(-1)}`} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">


            { /* Carrito */}
            
            <div className="flex flex-col mt-5">
              <PaidOrder isPaid={order!.isPaid} />
          
              { /* Items */}
              {
                order!.orderItems.map((item) => (
                  <div key={item.product.slug + '-' + item.size} className="flex mb-5">
                    <Image
                      src={`/products/${ item.product.ProductImage[0].url}`}
                      width={100}
                      height={100}
                      style={{
                        width: "100px",
                        height: "100px", 
                      }}
                      alt={item.product.title}
                      className="mr-5 rounded"
                    /> 

                    <div>
                      <p>{item.product.title}</p>
                      <p>${item.price } * { item.quantity }</p>
                      <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity )} </p>
                      
                    </div>
                  </div>
                ))
              }
            </div>
    
            { /* Checkout - Resumen de orden */}
            <div className="bg-white rounded-xl p-7 shadow-xl">

                <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
                <div className="mb-10 ">
                <p className="text-2xl">{ address!.firstName  } { address!.lastName }</p>
                <p>{address!.address}</p>
                <p>{address!.address2}</p>
                <p>{address!.postalCode}</p>
                <p>{address!.city}, {address!.countryId}</p>
                <p>{address!.phone}</p>     
            </div> 

              {/* Divider */}
              <div className="w-full h-0.5 bg-gray-200 mb-10 rounded"></div>


               <h2 className="text-2xl mb-2">Resumen de orden</h2>
               <div className="grid grid-cols-2"> 
                  <span>Nº de artículos</span>
                  <span className="text-right">{ order?.itemsInOrder === 1 ? '1 artículo' : `${order?.itemsInOrder} artículos` }</span>

                  <span>Subtotal</span>
                  <span className="text-right">{ currencyFormat( order!.subTotal) }</span>
                  
                  <span>Impuestos (15%)</span>
                  <span className="text-right">{ currencyFormat(order!.tax) }</span>
                  
                  <span className="mt-5 text-2xl">Total</span>
                  <span className="mt-5 text-2xl text-right">{ currencyFormat(order!.total) }</span>
                 
                 

               </div>
               <div className="flex flex-col mt-5">
              <PaidOrder isPaid={order!.isPaid} />

              </div>
                

               </div>
            </div>
          </div> 

    </div>
  );
}