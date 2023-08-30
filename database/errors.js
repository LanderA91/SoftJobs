export const handleErrors = (code) => {
    switch (code) {
      case "22P02":
        return {
          status: 400,
          message: "Formato no válido en el parámetro",
        };
  
      case "400":
        return {
          status: 400,
          message: "El servidor no puede procesar la petición. Faltan datos en la petición o están erróneos",
        };
      case "404":
        return {
          status: 404,
          message: "No existe ese registro en la tabla",
        };
      case "28P01":
        return {
          status: 400,
          message: "Falló en la autenticación de la contraseña para el usuario."
        }
      default:
        return {
          status: 500,
          message: "Error de servidor",
        };
    }
  }