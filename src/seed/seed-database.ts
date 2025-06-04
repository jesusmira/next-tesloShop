import { initialData } from "./seed";
import { prisma }  from '../lib/prisma';


async function main() {

    //Borrar registros previos
    // await Promise.all([
    await   prisma.productImage.deleteMany();
    await   prisma.product.deleteMany();
    await   prisma.category.deleteMany();
        
    // ]);

    const { products, categories } = initialData;
 
    const categoriesData = categories.map(category => ({
        name: category,
    }));


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
    


    
    console.log('Seed Ejecutado correctamente');







}

(() =>{

    if (process.env.NODE_ENV === 'production') return;

    main();
})();