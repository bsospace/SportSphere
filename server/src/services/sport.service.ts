// Purpose: Service for sport-related operations.
// Details: This service contains methods to perform CRUD operations on sports.
// It interacts with the Prisma Client to perform database operations.

import { PrismaClient, Sport } from "@prisma/client";
import { handleError } from "../../utils/error-handler.util";

export class SportServices {
    private prismaClient: PrismaClient;

    /**
     * Constructor for the SportServices class
     * @param prismaClient - An instance of the Prisma Client
     */
    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;

        this.createSport = this.createSport.bind(this);
        this.getAllSports = this.getAllSports.bind(this);
        this.getSportById = this.getSportById.bind(this);
        this.updateSport = this.updateSport.bind(this);
        this.deleteSport = this.deleteSport.bind(this);
    }

    /**
     * Create a new sport
     * @param name - The name of the sport
     * @param slug - A unique slug for the sport
     * @returns The newly created sport object
     * @throws An error if the sport creation fails
     */
    public async createSport(name: string, slug: string): Promise<Sport> {
        try {
            const newSport = await this.prismaClient.sport.create({
                data: {
                    name,
                    slug,
                },
            });
            return newSport;
        } catch (error) {
            throw handleError(error, 500);
        }
    }

    /**
     * Retrieve all sports from the database
     * @returns An array of all sports
     * @throws An error if fetching sports fails
     */
    public async getAllSports(): Promise<Sport[]> {
        try {
            const sports = await this.prismaClient.sport.findMany();
            return sports;
        } catch (error) {
            console.error("Error fetching sports:", error);
            throw handleError(error, 500);
        }
    }

    /**
     * Retrieve a sport by its ID
     * @param id - The ID of the sport
     * @returns The sport object if found, or null if not found
     * @throws An error if fetching the sport fails
     */
    public async getSportById(id: string): Promise<Sport | null> {
        try {
            const sport = await this.prismaClient.sport.findUnique({
                where: {
                    id,
                },
            });
            return sport;
        } catch (error) {
            throw handleError(error, 500);
        }
    }

    /**
     * Update a sport by its ID
     * @param id - The ID of the sport to update
     * @param name - (Optional) The new name for the sport
     * @param slug - (Optional) The new slug for the sport
     * @returns The updated sport object
     * @throws An error if the sport update fails
     */
    public async updateSport(id: string, name?: string, slug?: string): Promise<Sport> {
        try {
            const updatedSport = await this.prismaClient.sport.update({
                where: {
                    id,
                },
                data: {
                    name,
                    slug,
                },
            });
            return updatedSport;
        } catch (error) {
            throw handleError(error, 500);
        }
    }

    /**
     * Soft delete a sport by its ID
     * @param id - The ID of the sport to delete
     * @returns The updated sport object with the `deletedAt` field set
     * @throws An error if the sport deletion fails
     */
    public async deleteSport(id: string): Promise<Sport> {
        try {
            const deletedSport = await this.prismaClient.sport.update({
                where: {
                    id,
                },
                data: {
                    deletedAt: new Date(),
                },
            });
            return deletedSport;
        } catch (error) {
            throw handleError(error, 500);
        }
    }
}
