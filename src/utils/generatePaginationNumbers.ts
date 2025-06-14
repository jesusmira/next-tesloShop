
export const generatePaginationNumbers = ( currentPage: number, totalPages: number ) => {

    // Si el numero total de páginas es 7 o menos
    // vamos a mostrar todas las páginas sin puntos suspensivos
    if ( totalPages <= 7 ){
        return Array.from({ length: totalPages }, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7];
    }


    // Si la página actual esta entre las primeeras 3 páginas
    // mostrar las primeras 3, puntos suspensivos y las últimas 2 páginas
    if ( currentPage <= 3 ){
        return [1, 2, 3, '...', totalPages-1, totalPages]; // [1, 2, 3, ..., 49, 50];
    }

    // Si la pagina actual esta entre las últimas 3 páginas
    // mostrar las primeras 2 páginas, puntos suspensivos y las últimas 3
    if ( currentPage >= totalPages - 2 ){
        return [1, 2, '...',  totalPages-2, totalPages-1, totalPages]; // [1, ..., 47, 48, 49];  
    }

    // Si la página actual esta en otro lugar medio
    // mostrar la primera página, puntos suspensivos y las páginas actual y vecinos
    return [1, '...', currentPage-1, currentPage, currentPage+1, '...', totalPages]; // [1, ..., 23, 24, 25, ..., 49];

}