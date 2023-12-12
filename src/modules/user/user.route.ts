import { FastifyInstance } from "fastify";
import { $ref } from "./user.schema";
import {
    addCartItemHandler,
    createAddressHandler,
    createAffiliateLinkHandler,
    createContactHandler,
    decreCartItemQtyHandler,
    deleteAddressHandler,
    deleteCartItemHandler,
    deleteUserHandler,
    getAddressHandler,
    getAffiliateLinkHandler,
    getCartItemHandler,
    getUserAddressesHandler,
    getUserCartHandler,
    getUserContactHandler,
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
                tags: ["Address"],
                description: "Add address info",
                response: { 201: $ref("addressResponseSchema") },
            },
        },
        createAddressHandler
    );

    server.put(
        "/address/:addressId",
        {
            preHandler: [server.authenticate],
            schema: {
                tags: ["Address"],
                description: "Update a user address in {field:value} - format",
                params: $ref("addressIdSchema"),
                response: { 200: $ref("addressResponseSchema") },
            },
        },
        updateAddressHandler
    );

    server.delete(
        "/address/:addressId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("addressIdSchema"),
                response: { 200: $ref("msg") },
                tags: ["Address"],
                description: "Delete/remove address",
            },
        },
        deleteAddressHandler
    );

    server.get(
        "/address/:addressId",
        {
            schema: {
                params: $ref("addressIdSchema"),
                response: { 200: $ref("addressResponseSchema") },
                tags: ["Address"],
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
                tags: ["Address"],
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
        createContactHandler
    );

    server.put(
        "/contact/:contactId",
        {
            preHandler: [server.authenticate],

            schema: {
                params: $ref("contactIdSchema"),
                response: { 200: $ref("contactResponseSchema") },
                tags: ["User"],
                description: "update user contact record using the {field:value} - body format",
            },
        },
        updateContactHandler
    );

    server.get(
        "/contact",
        {

            preHandler: [server.authenticate],
            schema: {
                response: { 200: $ref("contactResponseSchema") },
                tags: ["User"],
                description: "get user contact record",
            },
        },
        getUserContactHandler
    );

    //  ================ CART =====================
    server.post(
        "/cart",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("createcartSchema"),
                response: { 201: $ref("cartResponseSchema") },
                tags: ["Cart"],
                description: "add product/item to cart item",
            },
        },
        addCartItemHandler
    );

    server.get(
        "/cart/cart-item-incre/:cartId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("cartIdSchema"),
                response: { 200: $ref("cartResponseSchema") },
                tags: ["Cart"],
                description: "increment the user cart item quantity value",
            },
        },
        increCartItemQtyHandler
    );

    server.get(
        "/cart/cart-item-decre/:cartId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("cartIdSchema"),
                response: { 200: $ref("cartResponseSchema") },
                tags: ["Cart"],
                description: "decrement the user cart item quantity value",
            },
        },
        decreCartItemQtyHandler
    );

    server.delete(
        "/cart/:cartId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("cartIdSchema"),
                response: { 200: $ref("msg") },
                tags: ["Cart"],
                description: "remove an item from cart ",
            },
        },
        deleteCartItemHandler
    );

    server.get(
        "/cart/:cartId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("cartIdSchema"),
                response: { 200: $ref("cartResponseSchema") },
                tags: ["Cart"],
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
                response: { 200: $ref("cartReponsesSchema") },
                tags: ["Cart"],
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
                // body: $ref("updateSchema"),
                response: { 200: $ref("userInfo") },
                tags: ["User"],
                description:
                    "update user fiel by - using a {field: value} as the body format ",
            },
        },
        updateUserHandler
    );

    server.get(
        "/:userId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("userIdSchema"),
                tags: ["User"],
                description: "retrieve a specific user",
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
                response: { 200: $ref("msg") },
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
                tags: ["Affiliate"],
                description: "generate/copy affiliate link",
                response: { 201: $ref("affLinkResponseSchema") },
            },
        },
        createAffiliateLinkHandler,
    );

    server.get(
        "/affiliate",
        {
            preHandler: [server.authenticate, server.guard.scope("affiliate")],
            schema: {
                tags: ["Affiliate"],
                description: "retrieve all affiliate links",
                 response: { 200: $ref("getLinksResponse") },
            },
        },
        getAffiliateLinkHandler
    );

    // =================== ADMIN =========================
    server.get(
        "/admin",

        {
            preHandler: [server.authenticate, server.guard.scope("admin")],
            schema: {
                tags: ["Admin"],
                description: "return all user in the system ",
                response: { 200: $ref("userDetailSchema") },  // #[attention]
            },
        },
        getUsersHandler
    );
}

export default userRoutes;
