import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { ProductIdInput } from "../product/product.schema";
import { AffiliatePurchaseService, OrderService, PaystackService, SaleService } from "./payment.service";
import prisma from "src/utils/prisma.util";
import { User } from "src/utils/user.util";




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

    const { email } = request.user as User

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
        await orderService.createOrder({ amount: price, status: "pending", reference: paystackResponse.data.reference })

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