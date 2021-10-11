import express from "express";

import { userController } from "../controllers";

export default express
  .Router()
  .post("/singup", userController.signup)
  .post("/login", userController.login)
  .post("/logOut", userController.logout);
