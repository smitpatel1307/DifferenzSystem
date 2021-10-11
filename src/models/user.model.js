import { Schema, model, Types } from "mongoose";
import { ObjectID } from "mongodb";

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
    },
    phone: { type: String },
    firstname: { type: String },
    lastname: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const User = new model("User", userSchema);

export default User;
