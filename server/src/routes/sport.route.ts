import { Router } from 'express';
import { sportController } from '../controllers/sport';

const router = Router();

// Bind the controller methods to the route
router.get('/sports', sportController.getAllSports);

export { router as sportRouter };
