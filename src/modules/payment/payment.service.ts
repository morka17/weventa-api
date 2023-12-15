import axios from "axios";
import { CreateOrderInput, CreateSaleInput, PaystackInitializeResponse } from "./payment.schema";
import prisma from "src/utils/prisma.util";


export class AffiliatePurchaseService {
    constructor() { }

    async trackAffiliatePurchase(linkId: number, productId: number, quantity: number): Promise<void> {
        await prisma.affiliatePurchase.create({
            data:
            {
                linkId,
                productId,
                quantity,
            }
        })
    }

}


// Order Service - 
export class OrderService {
    constructor() {

    };

    async createOrder(data: CreateOrderInput) {
        return await prisma.order.create({ data: data })
    }

    async getOrder(query: any) {
        const orders = await prisma.order.findMany({ where: query })
        return orders
    }

    async updateOrder(id: number, status: string) {
        const order = await prisma.order.update({ data: { status: status }, where: { id: id } })
        return order
    }

}




// Sale Service - 
export class SaleService {
    constructor() {

    };

    async createSale(data: CreateSaleInput) {
        return await prisma.sale.create({ data: data })
    }

    async getSale(query: any) {
        const sales = await prisma.sale.findMany({ where: query })
        return sales
    }

}


// Paystack - Payment 
export class PaystackService {
    private apiKey: string;
    private apiUrl: string;

    constructor() {
        this.apiKey = ""; // Insert API KEY 
        this.apiUrl = 'https://api.paystack.co';
    }

    async initializePayment(orderAmount: number, email: string): Promise<PaystackInitializeResponse> {


        try {
            const response = await axios.post(
                `${this.apiUrl}/transaction/initialize`,
                {
                    email: email,
                    amount: orderAmount * 100,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            console.error('Paystack initialization error:', error.response?.data || error.message);
            throw new Error('Failed to initialize payment with Paystack');
        }
    }
}
