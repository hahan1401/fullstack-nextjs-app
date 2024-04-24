// ts-ignore 7017 is used to ignore the error that the global object is not
// defined in the global scope. This is because the global object is only
// defined in the global scope in Node.js and not in the browser.

import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma


// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton: () => PrismaClient = () => {
//   return new PrismaClient();
// };

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
 