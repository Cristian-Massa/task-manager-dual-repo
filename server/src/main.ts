import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { mongoDb } from "@/mongoose/MongoDbConnection";
import { FRONTEND_URL, PORT } from "@/src/config/envConfig";
import { indexRouter } from "@/src/routes/indexRouter";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: FRONTEND_URL!, credentials: true }));
app.use("/", indexRouter);

app.listen(PORT, async () => {
  await mongoDb.connect();
  console.log("App listen port: " + PORT);
});

process.on("SIGINT", async () => {
  await mongoDb.disconnect();
  console.log("App disconnected from MongoDB.");
  process.exit(0);
});
