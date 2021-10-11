import express from "express";
import { cartController } from "../controllers";

// ADD API as method GET => PUT => POST => DELETE
export default express
  .Router()
  .get("/getCart", cartController.getCart)

  .post("/addRemoveCart", cartController.addToCart)
  .delete("/removeFromCart", cartController.removeItemFromCart);
