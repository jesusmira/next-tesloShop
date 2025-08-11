'use server';
import { prisma } from "@/lib/prisma";


export const  deleteUserAddress = async(  userId: string,) => {
  try {
    const address = await prisma.userAddress.delete({
      where: { userId: userId }
    })
    return {
        ok: true,
    };

  } catch (error) {
    console.log(error)
    throw new Error('No se pudo eliminar la dirección')
  }
}