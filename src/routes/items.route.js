import express from "express";

import { itemController } from "../controllers";

export default express
  .Router()
  .post("/addUpdateitems", itemController.addUpdateItems)
  .get("/getitems", itemController.getItems)
  .delete("/removeitems", itemController.removeItem);
