import { prismaClient } from '../index';
import { Request, Response } from 'express';

export class SportController {
    constructor() {
        this.getAllSports = this.getAllSports.bind(this);
        this.getSportById = this.getSportById.bind(this);
        this.createSport = this.createSport.bind(this);
        this.updateSport = this.updateSport.bind(this);
        this.deleteSport = this.deleteSport.bind(this);
    }

    public async getAllSports(req: Request, res: Response): Promise<any> {
        try {
            const sports = await prismaClient.sport.findMany();
            return res.status(200).json({
                success: true,
                data: sports,
                message: 'Successfully fetched sports',
            });
        } catch (error) {
            console.error('Error fetching sports:', error);
            res.status(500).json({ error: 'Failed to fetch sports' });
        }
    }

    public async getSportById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const sport = await prismaClient.sport.findUnique({ where: { id } });
            if (!sport) {
                return res.status(404).json({ success: false, error: 'Sport not found' });
            }
            return res.status(200).json({
                success: true,
                data: sport,
                message: 'Successfully fetched sport',
            });
        } catch (error) {
            console.error('Error fetching sport:', error);
            res.status(500).json({ error: 'Failed to fetch sport' });
        }
    }

    public async createSport(req: Request, res: Response) {
        try {
            const { name, description } = req.body;

            if (!name || typeof name !== 'string') {
                return res.status(400).json({ success: false, error: 'Invalid name' });
            }

            const newSport = await prismaClient.sport.create({
                data: { name, description },
            });

            return res.status(201).json({
                success: true,
                data: newSport,
                message: 'Successfully created sport',
            });
        } catch (error) {
            console.error('Error creating sport:', error);
            res.status(500).json({ error: 'Failed to create sport' });
        }
    }

    public async updateSport(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const updatedSport = await prismaClient.sport.update({
                where: { id },
                data: { name, description },
            });

            return res.status(200).json({
                success: true,
                data: updatedSport,
                message: 'Successfully updated sport',
            });
        } catch (error) {
            console.error('Error updating sport:', error);
            res.status(500).json({ error: 'Failed to update sport' });
        }
    }

    public async deleteSport(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await prismaClient.sport.delete({ where: { id } });
            return res.status(200).json({
                success: true,
                message: 'Successfully deleted sport',
            });
        } catch (error) {
            console.error('Error deleting sport:', error);
            res.status(500).json({ error: 'Failed to delete sport' });
        }
    }
}

export const sportController = new SportController();
