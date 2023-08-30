import { myModel } from "../models/model.js";
import { handleErrors } from "../database/errors.js";
import { signJWT } from "../middlewares/authMiddleware.js";



const createNewUser = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  try {
    const result = await myModel.addNewUser({ email, password, rol, lenguage });
    return res.status(201).json({ ok: true, message: "Nuevo usuario agregado", result });
  } catch (error) {
    const { status, message } = handleErrors(error.code);
    console.log("error: ", status, " - ", message);
    return res.status(status).json({ ok: false, result: message });
  }
}

const loginUser = async (req, res) => {
  try {
    // email comes from the middleware verifyCredentials, is more clear in the route.js
    const email = req.email;
    const token = signJWT({ email });
    res.status(200).json(token);

  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error); // RESPUESTA SERVIDOR ERROR CREDENCIALES
  }
}

const getUsers = async (req, res) => {
  try {
    const rows = await myModel.getUserInfo(req.email);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status();
  }
}

export const myController = { createNewUser, loginUser, getUsers };