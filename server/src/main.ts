import { FRONTEND_URL, PORT } from "@/src/config/envConfig";
import { indexRouter } from "@/src/routes/indexRouter";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: FRONTEND_URL!, credentials: true }));
app.use("/", indexRouter);

app.listen(PORT ?? 3000, () => {
  console.log("App listen port: " + (PORT ?? 3000));
});
