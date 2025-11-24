'use server'

import { auth } from '@/auth.config';
import type { Address, Size } from '@/interfaces';
import { prisma } from '@/lib/prisma';




interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productsIds: ProductToOrder[], address: Address) => {

    const session = await auth();
    const userId = session?.user.id;

    // verificar sesión de usuario

    if (!userId) {
       return {
        ok: false,
        message: 'No hay sesión de un usuario'
       }
    }

    // Obtener la información de los productos
    // Nota: recuerden que podemos llevar 2 productos con la misma id pero diferente size
    const products = await prisma.product.findMany({
        where: {
            id:{
                in: productsIds.map( p => p.productId )
            }
        }
    });

    console.log(products);

    // Calcular los montos //Encabezado
    const itemsInOrder = productsIds.reduce( ( count, p )=> count + p.quantity, 0);

    // los totales de tax, subtotal, total
    const { tax, subTotal, total } = productsIds.reduce( (totals, item) => {

      const productQuantity = item.quantity;  
      const product = products.find( p => p.id === item.productId);

      if (!product) throw new Error(`${item.productId} no encontrado -500`);

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;
      
        return totals;
    }, {subTotal: 0, tax: 0, total: 0} );

    // Crear la transacción
    try {
        const prismaTX = await prisma.$transaction( async (tx) => {
    
            // 1. Actualizar el stock de los productos
    
            //Acumular los valores
            const updatedProductsPromises = products.map( async (product) => {
    
                const productQuantity = productsIds.filter(
                    p => p.productId === product.id
                ).reduce(( acc, item ) => item.quantity + acc, 0);
            
                if (productQuantity === 0) {
                    throw new Error(`${product.id} no tiene cantidad definida`);
                }
    
                return tx.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                    //    inStock: product.inStock - productQuantity // No hacer contendra un valor viejo
                        inStock:{ 
                            decrement: productQuantity
                        }
                    }
                });
           
            });
            const updatedProducts = await Promise.all( updatedProductsPromises );
            // verificar valores negativos en la s existencia 0 no hay stock
            updatedProducts.forEach( product => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} no tiene stock suficiente`);
                }
            });
            
            
            // 2. Crear la orden - Encabezado - Detalle
    
            const order = await tx.order.create({
                data: {
                    userId: userId!,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
                    
    
                    orderItems:{
                        createMany: {
                            data: productsIds.map( p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find( prod => prod.id === p.productId )?.price ?? 0
                            }))
                        }
                    }
                    
                }
            });
            // Validar, si el price es cero, entonces, lanzar un error
    
    
            //3. Crear la dirección de la orden
            // Address
            const { country, ...restAddress } = address;
    
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,  
                    countryId: country,
                    orderId: order.id
                }
            });
    
            return {
                order: order,
                updatedProducts: updatedProducts,
                orderAddress: orderAddress
            }
    
    
        });
        return {
            ok: true,
            order: prismaTX.order,
            prismaTx: prismaTX,
            message: 'Orden creada correctamente',
        }
        
    } catch (error: any ) {
        return {
            ok: false,
            message: error.message
        }   
    }
    



}
    