import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.DB_URL
export const FRONTEND_URL = process.env.FRONTEND_URL