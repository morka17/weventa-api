import { Prisma, PrismaClient } from "@prisma/client";
import { deflate } from "zlib";

const prisma = new PrismaClient()

export default prisma;