import { FastifyInstance } from "fastify";
import { $ref } from "./user.schema";
import {
    addCartItemHandler,
    createAddressHandler,
    decreCartItemQtyHandler,
    deleteAddressHandler,
    deleteCartItemHandler,
    deleteUserHandler,
    getAddressHandler,
    getCartItemHandler,
    getUserAddressesHandler,
    getUserCartHandler,
    getUserHandler,
    getUsersHandler,
    increCartItemQtyHandler,
    updateAddressHandler,
    updateContactHandler,
    updateUserHandler,
} from "./user.controller";

async function userRoutes(server: FastifyInstance) {
    server.post(
        "/address",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("createAddressSchema"),
                tags: ["user", "Address"],
                description: "Add address info",
                response: { 201: $ref("addressResponseSchema") },
            },
        },
        createAddressHandler
    );

    server.put(
        "/address",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("updateSchema"),
                tags: ["user", "Address"],
                description: "Update a user address in {field:value} - format",
                params: $ref("addressResponseSchema"),
                response: { 200: $ref("addressResponseSchema") },
            },
        },
        updateAddressHandler
    );

    server.delete(
        "/address",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("addressIdSchema"),
                response: { 200: $ref("msg") },
                tags: ["user", "Address"],
                description: "Delete/remove address",
            },
        },
        deleteAddressHandler
    );

    server.get(
        "/address",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("addressIdSchema"),
                response: { 200: $ref("addressResponseSchema") },
                tags: ["user", "Address"],
                description: "retrieve an address",
            },
        },
        getAddressHandler
    );

    server.get(
        "/address",
        {
            preHandler: [server.authenticate],
            schema: {
                response: { 200: $ref("addressesResponseSchema") },
                description: "return all user addresses",
                tags: ["User", "address"],
            },
        },
        getUserAddressesHandler
    );

    //  Contact
    server.post(
        "/contact",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("createContactSchema"),
                response: { 201: $ref("contactResponseSchema") },
                tags: ["User"],
                description: "create a user contact record",
            },
        },
        createAddressHandler
    );

    server.put(
        "/contact",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("updateSchema"),
                params: $ref("contactIdSchema"),
                response: { 200: $ref("contactResponseSchema") },
                tags: ["User"],
                description: "update user contact record",
            },
        },
        updateContactHandler
    );

    server.get(
        "/contact",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("contactIdSchema"),
                response: { 200: $ref("contactResponseSchema") },
                tags: ["User"],
                description: "get user contact record",
            },
        },
        updateContactHandler
    );

    //  ================ CART =====================
    server.post(
        "/cart",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("createcartSchema"),
                response: { 201: $ref("cartResponseSchema") },
                tags: ["User", "Cart"],
                description: "add product/item to cart item",
            },
        },
        addCartItemHandler
    );

    server.get(
        "/cart-item-incre",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("cartIdSchema"),
                response: { 200: $ref("cartResponseSchema") },

                description: "increment the user cart item quantity value",
            },
        },
        increCartItemQtyHandler
    );

    server.get(
        "/cart-item-decre",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("cartIdSchema"),
                response: { 200: $ref("cartResponseSchema") },
                tags: ["User", "Cart"],
                description: "decrement the user cart item quantity value",
            },
        },
        decreCartItemQtyHandler
    );

    server.delete(
        "/cart",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("cartIdSchema"),
                response: { 200: $ref("msg") },
                tags: ["User", "Cart"],
                description: "remove an item from cart ",
            },
        },
        deleteCartItemHandler
    );

    server.get(
        "/cart",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("cartIdSchema"),
                response: { 200: $ref("cartResponseSchema") },
                tags: ["User", "Cart"],
                description: "retrieve a specific  item from cart ",
            },
        },
        getCartItemHandler
    );

    server.get(
        "/cart",
        {
            preHandler: [server.authenticate],
            schema: {
                response: { 200: $ref("cartResponseSchema") },
                tags: ["User", "Cart"],
                description: "retrieve all user item from cart ",

            },
        },
        getUserCartHandler
    );


    // ==================    User   ======================
    server.put(
        "/",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("updateSchema"),
                response: { 200: $ref("userDetailSchema") },
                tags: ["User"],
                description:
                    "update user fiel by - using a {field: value} as the body format ",
            },
        },
        updateUserHandler
    );

    server.get(
        "/",
        {
            preHandler: [server.authenticate],
            schema: {
                tags: ["User"],
                description: "retrieve a specific (current) user",
                response: { 200: $ref("userDetailSchema") },
            },
        },
        getUserHandler
    );

    server.delete(
        "/",
        {
            preHandler: [server.authenticate],
            schema: {
                tags: ["User"],
                description: "delete user account",
                response: { 200: $ref("userDetailSchema") },
            },
        },
        deleteUserHandler
    );

    // ===============  Affiliate ======================
    server.post(
        "/affiliate",
        {
            preHandler: [server.authenticate, server.guard.scope("affiliate")],
            schema: {
                tags: ["User"],
                description: "generate/copy affiliate link",
                response: { 200: $ref("userDetailSchema") },
            },
        },
        getUserHandler
    );

    server.get(
        "/affiliate",
        {
            preHandler: [server.authenticate, server.guard.scope("affiliate")],
            schema: {
                tags: ["User"],
                description: "retrieve all affiliate links",
                response: { 200: $ref("userDetailSchema") },
            },
        },
        getUserHandler
    );

    // =================== ADMIN =========================
    server.get(
        "/admin",

        {
            preHandler: [server.authenticate, server.guard.scope("admin")],
            schema: {
                tags: ["admin", "User"],
                description: "return all user in the system ",
                response: { 200: $ref("userDetailSchema") },
            },
        },
        getUsersHandler
    );
}

export default userRoutes;
