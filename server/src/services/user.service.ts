import { PrismaClient } from "@prisma/client";
import { handleError } from "../../utils/error-handler.util";

export class UserService {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    /**
     * Get a user by ID
     * @param id - User ID
     * @returns The user object if found
     */
    public async getUserById(id: string) {
        try {
            const user = await this.prismaClient.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw handleError(`User with ID ${id} not found`, 404);
            }
            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw handleError(error, 500);
        }
    }


    /**
     *  Get a user by email
     * @param email  - User email
     * @returns  The user object if found
     */

    public async getUserByEmail(email: string) {
        try {
            const user = await this.prismaClient.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw handleError(`User with email ${email} not found`, 404);
            }
            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw handleError(error, 500);
        }
    }


    /**
     * Create a new user
     * @param username - The username for the new user
     * @param email - The email for the new user
     * @returns The newly created user object
     */
    public async createUser(username: string, email: string, id: string) {
        try {
            const newUser = await this.prismaClient.user.create({
                data: { id,username, email },
            });
            return newUser;
        } catch (error) {
            console.error("Error creating user:", error);
            throw handleError(error, 500);
        }
    }

    /**
     * Update a user by ID
     * @param id - User ID
     * @param username - The updated username
     * @param email - The updated email
     * @returns The updated user object
     */
    public async updateUser(id: string, username?: string, email?: string) {
        try {
            const updatedUser = await this.prismaClient.user.update({
                where: { id },
                data: { username, email },
            });
            return updatedUser;
        } catch (error) {
            console.error("Error updating user:", error);
            throw handleError(error, 500);
        }
    }

    /**
     * Delete a user by ID
     * @param id - User ID
     * @returns The deleted user object
     */
    public async deleteUser(id: string) {
        try {
            const deletedUser = await this.prismaClient.user.delete({
                where: { id },
            });
            return deletedUser;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw handleError(error, 500);
        }
    }

    /**
     * Get all users
     * @returns An array of all users
     */
    public async getAllUsers() {
        try {
            const users = await this.prismaClient.user.findMany();
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw handleError(error, 500);
        }
    }
}
