'use server'

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";


interface SetTransactionId {
    transactionId: string;
    orderId: string;
}


export const setTransactionId = async ({transactionId, orderId}: SetTransactionId) => {

    const session = await auth();
    const userId = session?.user.id;

    // verificar sesión de usuario

    if (!userId) {
       return {
        ok: false,
        message: 'No hay sesión de un usuario'
       }
    }

   try {
        const order = await prisma.order.update({
            where: { id: orderId},
            data: {
                transactionId: transactionId
            }

        });
        if (!order) {
            return{
                ok: false,
                message: `No se encontró la orden con id ${orderId}`
            }
        }
        return {
            ok: true,
        }
    } catch (error: any ) {
        return {
            ok: false,
            message: 'No se puede actualizar el id de la transacción'
        }   
    }

}