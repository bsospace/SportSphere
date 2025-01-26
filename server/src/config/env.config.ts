import dotenv from "dotenv";

// Load environment variables from the `.env` file
dotenv.config();

interface DatabaseConfig {
    url: string;
    user: string;
    password: string;
    name: string;
    port: number;
}

interface PgAdminConfig {
    email: string;
    password: string;
    port: number;
}

interface AppConfig {
    appPort: number;
    appMode?: string;
    appUrl?: string;
    serviceName: string;
    openIdApi?: string;
    database: DatabaseConfig;
    pgAdmin: PgAdminConfig;
}

const envConfig: AppConfig = {
    appPort: parseInt(process.env.APP_PORT || "3000", 10),
    appMode: process.env.NODE_ENV || "development",
    appUrl: process.env.APP_URL || "http://localhost:3000",
    serviceName: process.env.SERVICE_NAME || "default_service",
    openIdApi: process.env.OPENID_API,
    database: {
        url: process.env.DATABASE_URL || "",
        user: process.env.PG_USER || "default_user",
        password: process.env.PG_PASSWORD || "default_password",
        name: process.env.PG_DATABASE || "default_db",
        port: parseInt(process.env.DB_PORT || "5432", 10),
    },
    pgAdmin: {
        email: process.env.PGADMIN_EMAIL || "admin@example.com",
        password: process.env.PGADMIN_PASSWORD || "default_password",
        port: parseInt(process.env.PGADMIN_PORT || "5050", 10),
    },
};

export default envConfig;
