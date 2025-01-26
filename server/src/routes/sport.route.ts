import { Router } from 'express';
import { SportController } from '../controllers/sport.controller';
import { SportServices } from '../services/sport.service';
import { prismaClient } from '../../prisma/prismaClient';


const sportServices = new SportServices(prismaClient)
const router = Router();
const sportController = new SportController(
    sportServices
);

// Bind the controller methods to the route
router.get('/sports', sportController.getAllSports);

export { router as sportRouter };
