import { Request, Response } from "express";
import { User } from "@prisma/client";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

export class AuthController {
    private authService: AuthService;
    private userService: UserService;

    constructor(authService: AuthService, userService: UserService) {
        this.authService = authService;
        this.userService = userService;

        // Bind methods to preserve `this` context
        this.login = this.login.bind(this);
        this.me = this.me.bind(this);
    }

    /**
     * Retrieve authenticated user's information
     * @param req - CustomRequest object with `user` field
     * @param res - Express Response object
     */
    public async me(req: Request, res: Response): Promise<any> {
        try {
            const user = req.user as User

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access",
                });
            }

            return res.json({
                success: true,
                message: "Successfully retrieved user info",
                data: user,
            });
        } catch (error) {
            console.error("Error in /me handler:", error);
            return res.status(500).json({
                success: false,
                message: "An unexpected error occurred",
            });
        }
    }

    /**
     * Handles User login requests
     * @param req - Express Request object
     * @param res - Express Response object
     */
    public async login(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid request",
                    errors: "Email and password are required",
                });
            }

            // Call AuthService for login logic
            const loginResponse = await this.authService.login(email, password);

            // Check for service-level errors
            if (loginResponse.error) {
                return res.status(400).json({
                    success: false,
                    message: loginResponse.error,
                });
            }

            const { data } = loginResponse;
            const credentials = data?.credentials;
            const accessToken = credentials?.accessToken;
            const refreshToken = credentials?.refreshToken;

            const profile = await this.authService.profile(accessToken);

            let user = await this.userService.getUserByEmail(email);

            if (!user) {
                user = await this.userService.createUser(
                    profile?.data?.username || "",
                    profile?.data?.email || "",
                    profile?.data?.id
                );
            }

            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: {
                    user,
                    credentials: {
                        accessToken,
                        refreshToken,
                    },
                },
            });
        } catch (error) {
            console.error("Error in login handler:", error);
            return res.status(500).json({
                success: false,
                message: "An unexpected error occurred",
            });
        }
    }
}
