import { Router } from "express";
import { myController } from "../controllers/controller.js";
import { verifyAndDecodeJWT, verifyUserCredentials } from "../middlewares/authMiddleware.js";
import { reportQuery } from "../middlewares/reportRequest.js";

const myRouter = Router();

myRouter.post("/usuarios", reportQuery, myController.createNewUser);
myRouter.post("/login", reportQuery, verifyUserCredentials, myController.loginUser);
myRouter.get("/usuarios", reportQuery, verifyAndDecodeJWT, myController.getUsers);


export default myRouter;