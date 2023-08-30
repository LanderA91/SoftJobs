import { config } from "dotenv";
config();

import jwt from 'jsonwebtoken';
import { myModel } from "../models/model.js";
import bcrypt from 'bcrypt';


export const verifyUserCredentials = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validar datos requeridos 
    if (!email || !password) {
      throw { message: "email y la constraseña requeridos" };
    };

    const dbUser = await myModel.getExistentUser(email);
    const dbUserPassword = dbUser.password;

    const validatePassword = await bcrypt.compare(password, dbUserPassword);

    // validacion contraseña
    if (validatePassword == false) {
      throw { message: "Contraseña incorrecta del usuario" };
    };
    req.email = dbUser.email;

    next();
  } catch (error) {
    console.log(error);
    throw { code: error.code };
  }

}


// Asign jwt to authorize restricted routes
export const signJWT = ({ email }) => {
  try {
    const token = jwt.sign({ email }, process.env.JWT_PASSWORD);
    return token;

  } catch (error) {
    console.log(error);
    throw { code: error.code };
  }
}


export const verifyAndDecodeJWT = (req, res, next) => {
  try {
    const bearerHeaders = req.headers.authorization;
    if (!bearerHeaders) {
      throw { message: "Token con formato Bearer es requerido" };
    }

    const token = bearerHeaders.split(" ")[1];
    jwt.verify(token, process.env.JWT_PASSWORD);
    const payload = jwt.decode(token);
    req.email = payload.email;

    next();
  } catch (error) {
    console.log(error);
    throw { code: error.code };

  }
}