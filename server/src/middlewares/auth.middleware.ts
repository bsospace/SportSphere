import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";
import { UserService } from "../services/user.service";
import { CryptoService } from "../services/crypto.service";
import { AuthService } from "../services/auth.service";
import envConfig from "../config/env.config";

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>;
    }
  }
}

export class AuthMiddleware {
  private userService: UserService;
  private cryptoService: CryptoService;
  private authService: AuthService;

  constructor(userService: UserService, cryptoService: CryptoService, authService: AuthService) {
    this.userService = userService;
    this.cryptoService = cryptoService;
    this.authService = authService;

    // Bind methods to preserve `this` context
    this.authenticate = this.authenticate.bind(this);
  }

  public authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      // Retrieve token from Authorization header or cookies
      const authHeader = req.headers?.authorization;
      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.accessToken;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Authorization failed!",
          error: "No token provided",
        });
      }

      // Decode token to get service
      const decode = this.cryptoService.decodeToken(token);

      // Check if token is for the correct service
      if (!decode?.service?.includes(envConfig.serviceName)) {
        return res.status(401).json({
          success: false,
          message: "Authorization failed!",
          error: "Invalid service in token",
        });
      }

      // Verify the access token
      const jwtPayload: JwtPayload | null = this.cryptoService.verifyAccessToken(
        token,
        decode.service
      );

      if (!jwtPayload) {
        return res.status(401).json({
          success: false,
          message: "Authorization failed!",
          error: "Invalid token",
        });
      }

      // Fetch user from the database
      let user = await this.userService.getUserById(jwtPayload.sub!);

      if (!user || user.deletedAt) {
        console.log("[INFO] User not found, creating new user...");
        console.log("[INFO] Fetching user profile from OpenID...");

        const userProfile = await this.authService.profile(token);

        if (!userProfile.success) {
          return res.status(401).json({
            success: false,
            message: "Authorization failed!",
            error: userProfile.error,
          });
        }

        console.log("[INFO] Profile:", userProfile);

        const newUser = await this.userService.createUser(
          userProfile.data?.username || "",
          userProfile.data?.email!,
          jwtPayload.sub!
        );

        user = newUser;
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in authentication:", error);

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error || "Unknown error",
      });
    }
  };
}

