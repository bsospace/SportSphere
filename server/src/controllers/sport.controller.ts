import { Request, Response } from "express";
import { SportServices } from "../services/sport.service";
import { handleError } from "../../utils/error-handler.util";



export class SportController {

    private sportServices: SportServices;

    constructor(sportServices: SportServices) {
        this.sportServices = sportServices;

        this.getAllSports = this.getAllSports.bind(this);
        this.getSportById = this.getSportById.bind(this);
        this.createSport = this.createSport.bind(this);
        this.updateSport = this.updateSport.bind(this);
        this.deleteSport = this.deleteSport.bind(this);
    }

    /**
     * Fetch all sports
     * @param req - Express request object
     * @param res - Express response object
     * @returns JSON response with all sports
     */
    public async getAllSports(req: Request, res: Response): Promise<any> {
        try {

            const sports = await this.sportServices.getAllSports();
            return res.status(200).json({
                success: true,
                data: sports,
                message: "Successfully fetched sports",
            });
        } catch (error) {
            console.error("Error fetching sports:", error);
            res.status(500).json(handleError(error, 500));
        }
    }

    /**
     * Fetch a sport by ID
     * @param req - Express request object
     * @param res - Express response object
     * @returns JSON response with the sport or an error message
     */
    public async getSportById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const sport = await this.sportServices.getSportById(id);

            if (!sport) {
                return res.status(404).json({
                    success: false,
                    error: "Sport not found",
                });
            }

            return res.status(200).json({
                success: true,
                data: sport,
                message: "Successfully fetched sport",
            });
        } catch (error) {
            console.error("Error fetching sport:", error);
            res.status(500).json(handleError(error, 500));
        }
    }

    /**
     * Create a new sport
     * @param req - Express request object
     * @param res - Express response object
     * @returns JSON response with the newly created sport
     */
    public async createSport(req: Request, res: Response): Promise<any> {
        try {
            const { name, slug } = req.body;

            if (!name || typeof name !== "string" || !slug || typeof slug !== "string") {
                return res.status(400).json({ success: false, error: "Invalid name or slug" });
            }

            const newSport = await this.sportServices.createSport(name, slug);

            return res.status(201).json({
                success: true,
                data: newSport,
                message: "Successfully created sport",
            });
        } catch (error) {
            console.error("Error creating sport:", error);
            res.status(500).json(handleError(error, 500));
        }
    }

    /**
     * Update a sport by ID
     * @param req - Express request object
     * @param res - Express response object
     * @returns JSON response with the updated sport
     */
    public async updateSport(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const { name, slug } = req.body;

            const updatedSport = await this.sportServices.updateSport(id, name, slug);

            return res.status(200).json({
                success: true,
                data: updatedSport,
                message: "Successfully updated sport",
            });
        } catch (error) {
            console.error("Error updating sport:", error);
            res.status(500).json(handleError(error, 500));
        }
    }

    /**
     * Delete a sport by ID
     * @param req - Express request object
     * @param res - Express response object
     * @returns JSON response confirming deletion
     */
    public async deleteSport(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const deletedSport = await this.sportServices.deleteSport(id);

            return res.status(200).json({
                success: true,
                data: deletedSport,
                message: "Successfully deleted sport",
            });
        } catch (error) {
            console.error("Error deleting sport:", error);
            res.status(500).json(handleError(error, 500));
        }
    }
}

