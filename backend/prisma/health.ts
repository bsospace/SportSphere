/**
 * Check the database prisma connection and return the connection status
 */

import { prismaClient } from "../src";

async function checkDatabaseConnection() {
    try {
        await prismaClient.$connect();
        console.log("[INFO] Database connection successful");
        return { status: "success", message: "Connected to the database" };
    } catch (error) {
        console.error("[ERROR] Database connection failed", error);
        return { status: "error", message: "Failed to connect to the database" };
    }
}

checkDatabaseConnection();
