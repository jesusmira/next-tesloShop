import { initialData } from "./seed";
import { prisma }  from '../lib/prisma';
import { countries } from './seed-countries';



async function main() {

    //Borrar registros previos
    // await Promise.all([
    await   prisma.orderAddress.deleteMany();
    await   prisma.orderItem.deleteMany();
    await   prisma.order.deleteMany();
    
    await   prisma.userAddress.deleteMany();
    await   prisma.user.deleteMany();
    await   prisma.country.deleteMany();
    
    await   prisma.productImage.deleteMany();
    await   prisma.product.deleteMany();
    await   prisma.category.deleteMany();

    // ]);

    const { products, categories, users } = initialData;
    
 
    const categoriesData = categories.map(category => ({
        name: category,
    }));

    await prisma.user.createMany({
        data: users,
    });


    // Categorias
    await prisma.category.createMany({
        data: categoriesData,
    });
    
    const categoriesDB = await prisma.category.findMany();

    const categorisMap = categoriesDB.reduce((map, category) => {

        map[category.name.toLocaleLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>); 


    
    // Productos
    const { images, type,  ...product1 } = products[0];


    products.forEach(async (product) => {
        const { images, type,  ...rest } = product;
        const dbProduct = await prisma.product.create({
           data:{
               ...rest,
               categoryId: categorisMap[type],
               
           } 
        });

        //Imagenes
        const imagesData = images.map(image => ({
            url : image,
            productId: dbProduct.id,
        }));

        await prisma.productImage.createMany({
            data: imagesData,
        });
        
    });
    
    //Country
     await prisma.country.createMany({
        data: countries,
    });

    
    console.log('Seed Ejecutado correctamente');







}

(() =>{

    if (process.env.NODE_ENV === 'production') return;

    main();
})();