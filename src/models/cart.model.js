import { Schema, model } from "mongoose";
import cartItemSchema from "./schema/cartItems.schema";

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "platformUser" },
    items: [cartItemSchema],
  },
  { timestamps: true, versionKey: false }
);

const Cart = new model("cart", cartSchema);

export default Cart;
