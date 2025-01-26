import  { Router } from "express";

import { AuthController } from "../controllers/authen.controller";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { PrismaClient } from "@prisma/client";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CryptoService } from "../services/crypto.service";

const authService = new AuthService();
const prismaClient = new PrismaClient();
const userService = new UserService(
    prismaClient
);

const authController = new AuthController(authService, userService);
const cryptoService = new CryptoService();
const authMiddleware = new AuthMiddleware(userService, cryptoService, authService);

const router = Router();


router.get("/me", authMiddleware.authenticate, authController.me);

export { router as authRouter };