import { DATABASE_URL } from "@/src/config/envConfig";
import mongoose from "mongoose";

export class MongoDB {
  private connection: typeof mongoose | null = null;
  private static instance: MongoDB;

  private constructor() {}

  public static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  public async connect(): Promise<void> {
    if (!DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is not defined in the environment variables."
      );
    }

    if (this.connection && this.connection.connection.readyState !== 0) {
      return;
    }

    try {
      this.connection = await mongoose.connect(DATABASE_URL);
      console.log("Connected to MongoDB.");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      throw new Error("Failed to connect to MongoDB.");
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.connection) {
      console.log("No active database connection to disconnect.");
      return;
    }

    try {
      await this.connection.disconnect();
      console.log("Disconnected from MongoDB.");
      this.connection = null;
    } catch (err) {
      console.error("Error disconnecting from MongoDB:", err);
    }
  }
}
export const mongoDb = MongoDB.getInstance();
