const { database } = require("../config");
const { encryptHashPassword } = require("../../util/utils");
// const format = require('pg-format')

const registraJobs = async (email, password, rol, lenguage) => {
  try {
    passEncrypt = await encryptHashPassword(password);
    console.log("ya se puede registrar");
    const sql =
      "INSERT INTO usuarios (id,email,password,rol,lenguage) values (DEFAULT,$1,$2,$3,$4) RETURNING*;";
    const values = [email, passEncrypt, rol, lenguage];
    const { rowCount } = await database.query(sql, values);
    if (rowCount) {
      return { msg: "Usuario fue registrado" };
    } else {
      return {
        msg: "Hubo un problema al registrar, favor de intentar nuevamente",
      };
    }
  } catch (error) {
    throw error;
  }
};

const verificaCredencial = async (email) => {
  try {
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    let values = [email];
    const { rows } = await database.query(consulta, values);
    if (rows.length) {
      const user = rows[0];
      return user.password;
    } else {
      return {
        code: 404,
        message: "No se encontró ningún usuario con estas credenciales",
      };
    }
  } catch (error) {
    next(error);
  }
};

const mostrarUsuario = async (email) => {
  try {
    const consulta = "SELECT email,rol,lenguage FROM usuarios WHERE email = $1";
    let values = [email];
    const { rows } = await database.query(consulta, values);

    if (rows.length) {
      const user = rows[0];

      return user;
    } else {
      return { msg: "No existe el usuario" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const queryssoftjobs = { verificaCredencial, registraJobs, mostrarUsuario };

module.exports = { queryssoftjobs };
