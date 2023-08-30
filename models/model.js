import bcrypt from "bcrypt";
import { pool } from "../database/connection.js"

// New user
const addNewUser = async ({ email, password, rol, lenguage }) => {
  try {
    if (!email || !password || !rol || !lenguage) {
      throw { code: '400' };
    }
    const bcryptPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO usuarios VALUES(DEFAULT,$1,$2,$3,$4) RETURNING *";

    const values = [email, bcryptPassword, rol, lenguage];
    const { rows: usuarios } = await pool.query(query, values);
    return usuarios;
  } catch (error) {
    throw { code: error.code };
  }
}

// get user in DB if it exist
const getExistentUser = async (email) => {

  try {
    if (!email) throw { code: '400' };
    const query = "SELECT * FROM usuarios WHERE email=$1";
    const values = [email];
    const { rowCount, rows: [userDB] } = await pool.query(query, values);

    if (!rowCount) throw { code: 404, message: "No se encontró usuario con estas credenciales" };

    return userDB;
  } catch (error) {
    throw { code: error.code };
  }

}

// get user info

const getUserInfo = async (email) => {
  try {
    const query = "SELECT * FROM usuarios WHERE email=$1";
    const values = [email];
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    throw { code: error.code };
  }
}

export const myModel = {
  addNewUser,
  getExistentUser,
  getUserInfo
  
};