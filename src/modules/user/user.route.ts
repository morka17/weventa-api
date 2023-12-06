import { FastifyInstance } from "fastify"
import { $ref } from "./user.schema"
import { addCartItemHandler, createAddressHandler, decreCartItemQtyHandler, deleteAddressHandler, deleteCartItemHandler, getAddressHandler, getCartItemHandler, getUserAddressesHandler, getUserCartHandler, getUserHandler, increCartItemQtyHandler, updateAddressHandler, updateContactHandler, updateUserHandler } from "./user.controller"






async function userRoutes(server:FastifyInstance) {

    
    server.post("/address", 
    {schema: {body: $ref("createAddressSchema"), response: {201: $ref("addressResponseSchema")}}},
     createAddressHandler,
    )

    server.put("/address", 
    {schema: {body: $ref("updateSchema"), params: $ref("addressResponseSchema"), response: {200: $ref("addressResponseSchema")}}},
     updateAddressHandler,
    )
    
    server.delete("/address", 
    {schema: {params: $ref("addressIdSchema"), response: {200: $ref("msg")}}},
     deleteAddressHandler,
    )

    server.get("/address", 
    {schema: {params: $ref("addressIdSchema"), response: {200: $ref("addressResponseSchema")}}},
     getAddressHandler,
    )

    server.get("/address", 
    {schema: { description: "return all user addresses" , tags: ["User"],  response: {200: $ref("addressesResponseSchema")}}},
     getUserAddressesHandler,
    )

    //  Contact 
    server.post("/contact", 
    {schema: {body: $ref("createContactSchema"),  description: "create a user contact record", response: {201: $ref("contactResponseSchema")}}},
     createAddressHandler,
    )

    server.put("/contact", 
    {schema: {body: $ref("updateSchema"), params: $ref("contactIdSchema") , description: "update user contact record", response: {201: $ref("contactResponseSchema")}}},
     updateContactHandler,
    )

    server.get("/contact", 
    {schema: { params: $ref("contactIdSchema") , description: "get user contact record", response: {201: $ref("contactResponseSchema")}}},
     updateContactHandler,
    )

  
    //  ================ CART =====================
    server.post("/cart", 
    {schema: {body: $ref("createcartSchema"),  description: "add product to  user cart item", response: {201: $ref("cartResponseSchema")}}},
     addCartItemHandler,
    )

    server.get("/cart-item-incre", 
    {schema: {params: $ref("cartIdSchema"),  description: "increment the user cart item quantity value", response: {201: $ref("cartResponseSchema")}}},
     increCartItemQtyHandler,
    )

    server.get("/cart-item-decre", 
    {schema: {params: $ref("cartIdSchema"),  description: "decrement the user cart item quantity value", response: {201: $ref("cartResponseSchema")}}},
     decreCartItemQtyHandler,
    )

    server.delete("/cart", 
    {schema: {params: $ref("cartIdSchema"),  description: "remove an item from cart ", response: {201: $ref("msg")}}},
     deleteCartItemHandler,
    )

    server.get("/cart", 
    {schema: {params: $ref("cartIdSchema"),  description: "retrieve a specific  item from cart ", response: {201: $ref("cartResponseSchema")}}},
     getCartItemHandler,
    )

    server.get("/cart", 
    {schema: { description: "retrieve all user item from cart ", response: {201: $ref("cartResponseSchema")}}},
     getUserCartHandler,
    )

    // ==================    User   ======================
    server.put("/", 
    {schema: {body: $ref("updateSchema"),  description: "update user fiel by - using a {field: value} as the body format ", response: {201: $ref("userDetailSchema")}}},
     updateUserHandler,
    )

    server.get("/", 
    {schema: {body: $ref("updateSchema"),  description: "retrieve a specific user", response: {201: $ref("userDetailSchema")}}},
     getUserHandler,
    )






}



export default userRoutes