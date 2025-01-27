// Prisma Client is a query builder that allows you to interact with your database using a type-safe API. It is generated based on your Prisma schema, which is a declarative way to define your application models and their relationships. Prisma Client is used to perform CRUD operations on your database, and it abstracts away the underlying SQL queries, making it easier to work with your database in a type-safe manner.

import { PrismaClient } from '@prisma/client';


// Initialize Prisma Client
export const prismaClient = new PrismaClient();