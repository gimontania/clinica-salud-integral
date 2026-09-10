import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

//conectamos prisma con la db PostgreSQL
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL ?? "",
});

//creamos una única instancia de Prisma Client
const prisma = new PrismaClient({ adapter });

export default prisma;