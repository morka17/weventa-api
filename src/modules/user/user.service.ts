import { env } from "src/config/env";
import prisma from "../../utils/prisma.util";
import { ContactsInput, CreateAddressInput, CreateAffLinkInput, CreateCartIput, UpdateInput } from "./user.schema";




// Address 
export async function createAddress(data: CreateAddressInput & { ownerId: number }) {
    const address = await prisma.address.create({
        data: data
    })
    return address

}


export async function findAddress(query: any) {
    const addresses = await prisma.address.findMany({
        where: query
    })

    return addresses
}

export async function updateAddress(query: any, data: UpdateInput) {
    const address = await prisma.address.update({
        where: query,
        data,
    })
    return address
}

export async function deleteAddressById(id: number) {
    const res = await prisma.review.delete({
        where: { id: id }
    })

    return res
}

// ====================  Contacts ====================================
export async function createContact(data: ContactsInput & { ownerId: number }) {
    const contact = await prisma.contact.create({
        data: data
    })
    return contact
}


export async function findcontact(query: any) {
    const contacts = await prisma.contact.findMany({
        where: query
    })

    return contacts
}

export async function updatecontact(query: any, data: UpdateInput) {
    const contact = await prisma.contact.update({
        where: query,
        data,
    })
    return contact
}

export async function deleteContactById(id: number) {
    const res = await prisma.contact.delete({
        where: { id: id }
    })

    return res
}

// ====================  Cart ====================================
export async function createCart(data: CreateCartIput & { ownerId: number, quantity: number }) {

    const cart = await prisma.cart.create(
        {
            data: data,
            include: {
                product: {
                    select: {
                        name: true,
                        description: true,
                        price: true,
    
                    }
                }
            }

        });
    return cart
}


export async function findCart(query: any) {
    const carts = await prisma.cart.findMany({
        where: query,
        include: {
            product: {
                select: {
                    name: true,
                    description: true,
                    price: true,

                }
            }
        }
    })

    return carts
}

export async function updateCart(query: any, data: UpdateInput) {
    const cart = await prisma.cart.update({
        where: query,
        data,
        include: {
            product: {
                select: {
                    name: true,
                    description: true,
                    price: true,

                }
            }
        }
    })
    return cart
}

export async function deleteCartById(userId: number, id: number,) {
    const res = await prisma.cart.delete({
        where: { id: id, ownerId: userId }
    })

    return res
}

// ====================  User ====================================


export async function findUser(query: any) {
    const users = await prisma.user.findMany({
        where: query, 
        select: {
            id: true,
            firstName: true, 
            lastName: true,
            username: true, 
            userType: true, 
            gender: true, 
            aboutme: true,
            email: true, 
        }
    })

    return users
}

export async function updateUser(query: any, data: UpdateInput) {
    const user = await prisma.user.update({
        where: query,
        data,
        select: {
            id: true,
            firstName: true, 
            lastName: true,
            username: true, 
            userType: true, 
            gender: true, 
            aboutme: true,
            email: true, 
        }
    })
    return user
}

export async function deleteUserById(id: number) {
    const res = await prisma.user.delete({
        where: { id: id }
    })

    return res
}



// ====================  AFFILIATE ===========================


export async function generateAffiliateLink(data: CreateAffLinkInput &{ userId: number}) {
    const link = await prisma.affiliateLink.create({
        data: data,
        include: {
            product: {
                select: {
                    name: true,
                }
            }
        }
    })

    return `http://${env.HOST_NAME}/${link.product.name}/${link.id}`
}


// TODO: MOVE TO THE PAYMENT FEATURE
export async function trackAffiliatePurchase(linkId: number, productId: number, quantity: number): Promise<void>{
    await prisma.affiliatePurchase.create({
        data: 
        {
            linkId, 
            productId, 
            quantity, 
        }
    })
}

export async function getAffiliateLinks(userId: number){
  const links =  await prisma.affiliateLink.findMany({
        where: {userId: userId}, 
        include: {
            product: {
                select:{
                    name: true,
                }
            }, 
            AffiliatePurchase: true, 
        }
    })

    return links 
}

