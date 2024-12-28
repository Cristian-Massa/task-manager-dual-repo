import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: false }
);

export const Users =
  mongoose.models.User ?? mongoose.model("Users", usersSchema);
