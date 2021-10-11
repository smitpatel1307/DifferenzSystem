import { Schema } from "mongoose";
import addOnSchema from "./addOns.schema";

const cartItemSchema = new Schema({
  itemId: { type: Schema.Types.ObjectId, ref: "Items" },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity can not be less then 1."],
  },
  addOns: [addOnSchema],
});

export default cartItemSchema;
