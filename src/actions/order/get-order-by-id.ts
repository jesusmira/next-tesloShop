'use server'

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { size } from "zod/v4";

export const getOrderById = async (id: string) => {
    
    const session = await auth();
    if (!session?.user){
        return{
            ok: false,
            message: 'Debe estar autenticado '
        }
    };

    try {


        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                orderAddress: true, 
                orderItems: { 
                    select: { 
                        price: true,
                        quantity: true,
                        size: true,
                        product: { 
                            select: {
                                title: true,
                                slug: true,
                                price: true,
                                ProductImage:{
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    },
                },
            },
        });

        if (!order) throw `${id} no existe`;

        if( session.user.role === 'user'){
            if (order.userId !== session.user.id) {
                throw `${id} no es de ese usuario`
            }
        }
        
        

        return {
            ok: true,
            order,
            // orderAddress: order?.orderAddress ?? {
            //     street: "",
            //     city: "",
            //     zip: "",
            //     country: "",
            // },
            // orderItemsWithImage: order?.orderItems.map((item) => ({
            //     id: item.id,
            //     title: item.product.title,
            //     price: item.product.price,
            //     quantity: item.quantity,
            //     size: item.size,
            //     slug: item.product.slug,
            //     url: item.product.ProductImage[0].url ?? "default.png", // 👈 primera imagen
            // })) ?? []
            };
        
    }catch (error ) {
        console.log(error)
        return {
            ok: false,
            message: 'Orden no existe'
        }   
    }

    
    
}