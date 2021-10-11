import { express } from "express";
const port = 9000;
import { userRoute, cartRoute, itemsRoute } from "./src/routes";
import { urlencoded, json } from "body-parser";
import cookieparser from "cookie-parser";
require("./src/config/db connection");

const server = express();
server.use(json());
server.use(cookieparser());

server.use("/user", userRoute);
server.use("/cart", cartRoute);
server.use("/items", itemsRoute);

server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
