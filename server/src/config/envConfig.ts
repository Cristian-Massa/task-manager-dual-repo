import * as dotenv from "dotenv";
dotenv.config();
export const {
  PORT = 3000,
  DATABASE_URL = "",
  FRONTEND_URL = "",
  JSON_WEB_TOKEN_SECRET = "",
  NODE_ENV = "production",
} = process.env;
