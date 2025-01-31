import { Router } from "express";
import { MatchService } from "../services/macth.service";
import { MacthController } from '../controllers/macth.controller';
import { prismaClient } from "../../prisma/prismaClient";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { AuthController } from "../controllers/authen.controller";
import { CryptoService } from "../services/crypto.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";


const matchService = new MatchService(
    prismaClient
);

const authService = new AuthService();
const userService = new UserService(
    prismaClient
);

const cryptoService = new CryptoService();
const authMiddleware = new AuthMiddleware(userService, cryptoService, authService);


const router = Router();

const matchController = new MacthController(
    matchService
);

// Bind the controller methods to the route
router.get('/match/:sportSlug', matchController.getMacthBySportSlug);
router.get('/match/:sportSlug/:id', matchController.getMatchById);
router.put('/match/:id/edit', authMiddleware.authenticate,matchController.updateMatch);
router.put('/match/:id/end', authMiddleware.authenticate,matchController.endMatch);

export { router as matchRouter };