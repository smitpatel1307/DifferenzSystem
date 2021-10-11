import { Schema, model } from "mongoose";
import { ObjectID } from "mongodb";

const itemsSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdBy: { type: ObjectID, ref: "User" },
    updatedBy: { type: ObjectID, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

const Items = new model("Items", itemsSchema);

export default Items;
