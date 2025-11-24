'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const OrderSumary = () => {

    const router = useRouter();

    const { getSummaryInformation } = useCartStore() 
    const { itemsInCart, subtotal, tax, total } = getSummaryInformation()
    // const { itemsInCart, subtotal, tax, total,  } = useCartStore((state) => state.getSummaryInformation()) ;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        
        if ( itemsInCart === 0 && loaded)   {
            router.replace('/empty')
        }
              
    },[itemsInCart, loaded, router])
    
    if (!loaded) {
        return <p>Loading...</p>;
    }


  return (
        <div className="grid grid-cols-2"> 
        
            <span>Nº de artículos</span>
            <span className="text-right">{ itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos` }</span>

            <span>Subtotal</span>
            <span className="text-right">{ currencyFormat( subtotal) }</span>
            
            <span>Impuestos (15%)</span>
            <span className="text-right">{ currencyFormat(tax) }</span>
            
            <span className="mt-5 text-2xl">Total</span>
            <span className="mt-5 text-2xl text-right">{ currencyFormat(total) }</span>

        </div>
  )
}
