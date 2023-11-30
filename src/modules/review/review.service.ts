import prisma from "../../utils/prisma.util";
import { CreateReviewInput } from "./review.schema";




export async function createReview( data :  CreateReviewInput & {userId: number}){
    const review = await prisma.review.create({
        data: data
    })
    return review

}


export async function findOneReview(query: any){
    const review = await prisma.review.findFirst({
        where: query
    })

    return review 
}


export async function findReview(query: any){
    const reviews = await prisma.review.findMany({
        where: query
    })

    return reviews 
}


export async function updateReview(query: any, data: Object){
    const review = await prisma.review.update({
        where: query, 
        data,
    })
    return review
}

export async function deleteReviewById(id: number){
    const res = await prisma.review.delete({
        where: {id: id}
    })

    return res
}