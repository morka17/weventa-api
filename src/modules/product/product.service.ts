import { extractKeywords } from "../../utils/extract_keywords.util";
import prisma from "../../utils/prisma.util";
import { CreateProductInput } from "./product.schema";



export async function searchProduct(searchQuery: string){

    const products = await prisma.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        search: searchQuery
                    }
                }, 
                {
                    description: {
                        search: searchQuery
                    }
                }
            ]
        }
    })

    return products
}


export async function searchProductsWithNLP(searchQuery: string){
    const keywords = extractKeywords(searchQuery)
    if (!keywords) return;

    const products = prisma.product.findMany({
        where: {
            AND: keywords.map(keyword => ({
                name: {
                    search: keyword
                }, 

                description: {
                    search: keyword
                }

            }) )
        }
    })

    return products
}




export async function createProduct( data : CreateProductInput & {ownerId: number}){
    const product = await prisma.product.create({
        data: data
    })

    return product

}



export async function findProduct(query: any){
    const products = await prisma.product.findMany({
        where: query
    })

    return products 
}

export async function updateProduct(query: any, data: Object){
    const product = await prisma.product.update({
        where: query, 
        data,
    })
    return product
}

export async function deleteProductById(id: number){
    const res = await prisma.product.delete({
        where: {id: id}
    })

    return res
}