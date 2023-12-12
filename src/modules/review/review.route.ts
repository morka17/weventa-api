import { FastifyInstance } from "fastify";
import { $ref } from "./review.schema";
import { createReviewHandler, deleteReviewHandler, getProductReviewsHandler, getReviewHandler, getReviewsHandler, getUserProductReviewsHandler, updateReviewHandler } from "./review.controller";






async function reviewRoutes(server: FastifyInstance) {

    server.post(
        "/",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("createReviewSchema"),
                tags: ["Review"],
                description: "Create a review for a product",
                response: { 201: $ref("reviewResponseSchema") },
            },
        },
        createReviewHandler
    );

    server.put(
        "/:reviewId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("reviewIdSchema"),
                body: $ref("updateSchema"),
                tags: ["Review"],
                description: "Update a review in {field:value} - format",
                response: { 200: $ref("reviewResponseSchema") },
            },
        },
        updateReviewHandler
    );

    server.delete(
        "/:reviewId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("reviewIdSchema"),
                tags: ["Review"],
                description: "delete a specific review",
                response: { 200: $ref("msg") },
            },
        },
        deleteReviewHandler
    );

    server.get(
        "/:reviewId",
        {
            
            schema: {
                params: $ref("reviewIdSchema"),
                tags: ["Review"],
                description: "retrieve a specific review",
                response: { 200: $ref("reviewResponseSchema") },
            },
        },
        getReviewHandler
    );


    server.get(
        "/user",
        {
            preHandler: [server.authenticate],
            schema: {
                tags: ["Review"],
                description: "retrieve reviews made by the current user",
                response: { 200: $ref("reviewsResponseSchema") },
            },
        },
        getReviewsHandler
    );

    server.get(
        "/user/product/:productId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("productIdSchema"),
                tags: ["Review"],
                description: "retrieve review made by current on this product",
                response: { 200: $ref("reviewsResponseSchema") },
            },
        },
        getUserProductReviewsHandler
    );

    server.get(
        "/product/:productId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("productIdSchema"),
                tags: ["Review"],
                description: "retrieve all reviews on this product ",
                response: { 200: $ref("reviewsResponseSchema") },
            },
        },
        getProductReviewsHandler,
    );
}



export default reviewRoutes;