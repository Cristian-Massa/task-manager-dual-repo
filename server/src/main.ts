import { FRONTEND_URL, NODE_ENV, PORT } from "@/src/config/envConfig";
import { indexRouter } from "@/src/routes/indexRouter";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: FRONTEND_URL!, credentials: true }));
app.use("/", indexRouter);
console.log(NODE_ENV);
app.listen(PORT, () => {
  console.log("App listen port: " + PORT);
});
