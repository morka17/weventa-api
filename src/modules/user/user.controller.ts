import { FastifyReply, FastifyRequest } from "fastify";
import { AddressIdInput, CartIdInput, ContactsIdInput, ContactsInput, CreateAddressInput, CreateAffLinkInput, CreateCartIput, UpdateInput } from "./user.schema";
import { createAddress, createCart, createContact, deleteAddressById, deleteCartById, findAddress, findCart, findUser, findcontact, generateAffiliateLink, getAffiliateLinks, updateAddress, updateCart, updateUser, updatecontact } from "./user.service";
import { User } from "src/utils/user.util";
import { UserIdParamInput } from "../authentication/authentication.schema";

// Address
export async function createAddressHandler(request: FastifyRequest<{
    Body: CreateAddressInput,
}>, reply: FastifyReply){

    const user = request.user as User

    try{
        const address = await createAddress({...request.body, ownerId: user.id})
        return reply.code(201).send(address)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}

export async function updateAddressHandler(request: FastifyRequest<{
    Body: UpdateInput,
    Params: AddressIdInput
}>, reply: FastifyReply){

    const body = request.body as Object
    const params = request.params
    const user = request.user as User

    try{
        const result = await findAddress({id: params.addressId})
        if (result.length <= 0){
            return reply.code(404).send({error: true, msg: "address not found"})
        } 
        if (user.id !== result[0].ownerId){
            return reply.code(401).send({error: true, msg: "Unauthorized"})
        }

        const address = await updateAddress({id: params.addressId}, body)
        return reply.code(200).send(address);
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}


export async function deleteAddressHandler(request: FastifyRequest<{
    Params: AddressIdInput
}>, reply: FastifyReply){

    const params = request.params
    const user = request.user as User 
    try{
        const result = await findAddress({id: params.addressId})
        if(result.length <= 0){
            return reply.code(404).send({error: true, msg:"address does not exist"})
        }

        if (result[0].ownerId !== user.id){
            return reply.code(403).send({error: true, msg:"Unauthorized"})
        }
        const res = await deleteAddressById(params.addressId)
        return reply.code(200).send({error: false, msg: "Deleted successfully"})
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}


export async function getAddressHandler(request: FastifyRequest<{
    Params: AddressIdInput
}>, reply: FastifyReply){

    const params = request.params

    try{
        const res = await findAddress({id: params.addressId})
        return reply.code(200).send(res)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}


export async function getUserAddressesHandler(request: FastifyRequest<{
    
}>, reply: FastifyReply){

    const user = request.user as User 

    try{
        const reviews = await findAddress({userId: user.id})
        return reply.code(200).send(reviews)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}



// ================== Contact controller ===================
export async function createContactHandler(request: FastifyRequest<{
    Body: ContactsInput,
}>, reply: FastifyReply){

    const user = request.user as User

    try{
        const contact = await createContact({...request.body, ownerId: user.id})
        return reply.code(201).send(contact)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}

export async function updateContactHandler(request: FastifyRequest<{
    Body: UpdateInput,
    Params: ContactsIdInput
}>, reply: FastifyReply){

    const body = request.body as Object
    const params = request.params
    const user = request.user as User

    try{
        const result = await findcontact({id: params.contactId})
        if (result.length <= 0){
            return reply.code(404).send({error: true, msg: "contact not found"})
        } 
        if (user.id !== result[0].ownerId){
            return reply.code(401).send({error: true, msg: "Unauthorized"})
        }

        const contact = await updatecontact({id: params.contactId}, body)
        return reply.code(200).send(contact);
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}

export async function getUserContactHandler(request: FastifyRequest<{
    
}>, reply: FastifyReply){

    const user = request.user as User 

    try{
        const contact = await findcontact({userId: user.id})
        return reply.code(200).send(contact)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}


//  ======================  CART  ========================
export async function addCartItemHandler(request: FastifyRequest<{
    Body: CreateCartIput,
}>, reply: FastifyReply){

    const user = request.user as User

    try{
        const contact = await createCart({...request.body, ownerId: user.id, quantity: 1})
        return reply.code(201).send(contact)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}

export async function increCartItemQtyHandler(request: FastifyRequest<{
    Params: CartIdInput
}>, reply: FastifyReply){

    const params = request.params
    const user = request.user as User

    try{
        const result = await findCart({id: params.cartId, ownerId: user.id})
        if (result.length <= 0){
            return reply.code(404).send({error: true, msg: "item not found"})
        }

        const cart = await updateCart({id: params.cartId}, {quantity: result[0].quantity + 1})

        return reply.code(200).send(cart);
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}

export async function decreCartItemQtyHandler(request: FastifyRequest<{
    Params: CartIdInput
}>, reply: FastifyReply){

    const params = request.params
    const user = request.user as User

    try{
        const result = await findCart({id: params.cartId, ownerId: user.id})
        if (result.length <= 0){
            return reply.code(404).send({error: true, msg: "item not found"})
        }

        if (result[0].quantity <= 0){
            return 
        }

        const cart = await updateCart({id: params.cartId}, {quantity: result[0].quantity - 1})

        return reply.code(200).send(cart);
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}

export async function deleteCartItemHandler(request: FastifyRequest<{
    Params: CartIdInput
}>, reply: FastifyReply){

    const params = request.params
    const user = request.user as User

    try{
        
        const cart = await deleteCartById(user.id, params.cartId)

        return reply.code(200).send({error: false, msg: "item removed successfully!"});
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}

export async function getCartItemHandler(request: FastifyRequest<{
    Params: CartIdInput
}>, reply: FastifyReply){

    const params = request.params
    const user = request.user as User

    try{
        
        const cart = await findCart({ownerId: user.id, id: params.cartId})

        return reply.code(200).send(cart);
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}


export async function getUserCartHandler(request: FastifyRequest<{
    
}>, reply: FastifyReply){

    const user = request.user as User 

    try{
        const cartItems = await findCart({ownerId: user.id})
        return reply.code(200).send(cartItems)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}


//  ==================   USER =======================

export async function updateUserHandler(request: FastifyRequest<{
    Body: UpdateInput,
}>, reply: FastifyReply){

    const body = request.body as Object
    const user = request.user as User

    try{
        const result = await findUser({id: user.id})
        if (result.length <= 0){
            return reply.code(404).send({error: true, msg: "user not found"})
        } 

        const updateduser = await updateUser({id: user.id}, body)
        return reply.code(200).send(updateduser);
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}

export async function getUsersHandler(request: FastifyRequest<{
    
}>, reply: FastifyReply){


    try{
        const user = await findUser({})
        return reply.code(200).send(user)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}

export async function getUserHandler(request: FastifyRequest<{
    Params: UserIdParamInput
}>, reply: FastifyReply){

    const params = request.params 

    try{
        const result = await findUser({id: params.id})
        return reply.code(200).send(result[0]);
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}



export async function deleteUserHandler(request: FastifyRequest<{
   
}>, reply: FastifyReply){

    const user = request.user as User

    try{
        const res = await findUser({id: user.id})
        return reply.code(200).send(res);
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}



// ================  Affilate =================
export async function createAffiliateLinkHandler(request: FastifyRequest<{
   Body: CreateAffLinkInput,
}>, reply: FastifyReply){
    const user = request.user as User

    try{
        const link = await generateAffiliateLink({...request.body, userId: user.id})
        return reply.code(200).send(link);
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}

export async function getAffiliateLinkHandler(request: FastifyRequest<{
    
 }>, reply: FastifyReply){
     const user = request.user as User
 
     try{
         const links = await getAffiliateLinks(user.id)
         return reply.code(200).send(links);
     }catch(e){
         console.log(e)
         return reply.code(500).send(e)
     }
 }
 

