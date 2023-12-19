import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { ProductIdInput } from "../product/product.schema";
import { AffiliatePurchaseService, OrderService, PaystackService, SaleService } from "./payment.service";
import prisma from "src/utils/prisma.util";
import { User } from "src/utils/user.util";
import { LinkIdInput, OrderIdInput, SaleIdInput } from "./payment.schema";
import { deleteCartItemHandler } from "../user/user.controller";
import { deleteCartByUserId } from "../user/user.service";




const paystackService = new PaystackService()
const saleService = new SaleService()
const affiliatePurchaseService = new AffiliatePurchaseService()
const orderService = new OrderService()



export async function checkOutHandler(request: FastifyRequest<{
}>, reply: FastifyReply) {

    const order = request.body
    const user = request.user as User


    const cart = await prisma.cart.findMany({ where: { ownerId: user.id } })

    if (cart.length <= 0) {
        reply.status(404).send({ error: true, msg: "No item found in cart" })
    }

    try {

        // Calculate total price in cart 

        //  Transaction 
        //  1. Create order  - pending 
        //  2. Initial paystack payment 
        //  2. Redirect to paystack 


        // WEB HOOK 
        //  1. Create sale for each product 
        //  2. Empty cart  
    } catch (e) {
        reply.status(500).send({ success: false, message: "Failed to create order" })
    }

}






export async function buyNowHandler(request: FastifyRequest<{
    Body: ProductIdInput
}>, reply: FastifyReply) {

    const { email, id } = request.user as User

    const { productId } = request.body
    const product = await prisma.product.findFirst({ where: { id: productId } })

    if (!product) {
        return reply.status(404).send({ error: true, msg: "Product not found" })
    }

    try {

        const { price } = product



        //  Transaction 


        // Initialize payment with paystack

        const paystackResponse = await paystackService.initializePayment(price, email)


        //  1. Create order  - pending 
        await orderService.createOrder({ userId: id, amount: price, status: "pending", reference: paystackResponse.data.reference })

        // return
        //  - Payment URL 
        // -  
        const orderResponse = {
            error: false,
            message: "Order created successfully",
            status: "pending",
            data: {
                payment_url: paystackResponse.data.authorization_url,
            }
        }

        reply.code(201).send(orderResponse);


        // WEB HOOK 
        //  1. Create sale for each product 
        //  2. Empty cart  
        //  3. Update order to completed 

    } catch (e) {
        reply.code(401).send({
            error: true,
            message: "Failed to create Order",
            status: "Failed",
            data: {}
        })
    }

}


// export async function paymentCallbackHandler(request: FastifyRequest<{
//     Body: ProductIdInput
// }>, reply: FastifyReply) {
//     const {id} = request.user as User 

//     try {


//         // WEB HOOK 
//         //  1. Create sale for each product 


//         //  2. Empty cart  
//         await deleteCartByUserId(id)

//         //  3. Update order to completed 
//        await  orderService.updateOrder({status: "completed"})
//     } catch (e) {
//         reply.code(401).send({
//             error: true,
//             message: "Failed to create Order",
//             status: "Failed",
//             data: {}
//         })
//     }

// }


// Affiliate purchases
export async function getAffiliatePurchasesHandler(request: FastifyRequest<{
}>, reply: FastifyReply) {
    const user = request.user as User

    try {

        const purchases = await affiliatePurchaseService.getTrackAffiliatePurchase({ ownerId: user.id })
        reply.code(200).send({
            error: false,
            message: `${purchases.length} purchases found`,
            data: purchases
        })

    } catch (e) {
        reply.code(401).send({
            error: true,
            message: "Failed to retrieve purchase",
            status: "Failed",
            data: {}
        })
    }

}



// Sale 
export async function getSalesHandler(request: FastifyRequest<{

}>, reply: FastifyReply) {
    const user = request.user as User


    try {

        const sales = await saleService.getSale({ ownerId: user.id })
        reply.code(200).send({
            error: false,
            message: `${sales.length} sales found`,
            data: sales
        })

    } catch (e) {
        reply.code(401).send({
            error: true,
            message: "Failed to retrieve sales",
        })
    }

}

export async function getSaleHandler(request: FastifyRequest<{
    Params: SaleIdInput
}>, reply: FastifyReply) {
    const user = request.user as User
    const saleId = request.params.saleId

    try {

        const sales = await saleService.getSale({ ownerId: user.id, id: saleId })
        if (sales.length <= 0) {
            return reply.code(200).send({
                error: false,
                message: `No sale item found`,
            })
        }
        return reply.code(200).send({
            error: false,
            message: `sale found`,
            data: sales[0]
        })

    } catch (e) {
        return reply.code(401).send({
            error: true,
            message: "Failed to retrieve sale",
            data: {}
        })
    }

}

export async function getOrdersHandler(request: FastifyRequest<{
}>, reply: FastifyReply) {
    const user = request.user as User
    

    try {

        const orders = await orderService.getOrder({ ownerId: user.id })
        if (orders.length <= 0) {
            return reply.code(200).send({
                error: false,
                message: `No order item found`,
            })
        }
        return reply.code(200).send({
            error: false,
            message: `${orders.length} orders found`,
            data: orders
        })

    } catch (e) {
        return reply.code(401).send({
            error: true,
            message: "Failed to retrieve orders",
            data: {}
        })
    }

}


export async function getOrderHandler(request: FastifyRequest<{
    Params: OrderIdInput
}>, reply: FastifyReply) {
    const {id} = request.user as User
    const {orderId} = request.params
    

    try {

        const orders = await orderService.getOrder({ userId: id, id: orderId })
        if (orders.length <= 0) {
            return reply.code(200).send({
                error: false,
                message: `No order item found`,
            })
        }
        return reply.code(200).send({
            error: false,
            message: `order found`,
            data: orders[0]
        })

    } catch (e) {
        return reply.code(401).send({
            error: true,
            message: "Failed to retrieve orders",
            data: {}
        })
    }

}
