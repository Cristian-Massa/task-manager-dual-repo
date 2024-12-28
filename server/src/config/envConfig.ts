import * as dotenv from "dotenv";
dotenv.config();
export const { PORT, DATABASE_URL, FRONTEND_URL, JSON_WEB_TOKEN_SECRET } =
  process.env;
