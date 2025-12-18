'use server';

import { prisma } from "@/lib/prisma";

export const getCategories = async () => {

    try {
        const categories = await prisma.category.findMany({
            orderBy:{
                name: 'asc'
            }
        } );
        
        if (!categories) return null;
        return categories ;
        
    } catch (error) {
       console.log(error);
       throw new Error('Error al obtener categorias');
    }




}