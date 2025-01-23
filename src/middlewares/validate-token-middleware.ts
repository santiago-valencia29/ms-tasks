import axios from "axios";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware para validar el token de autenticación.
 *
 * @param req - Objeto de solicitud HTTP.
 * @param res - Objeto de respuesta HTTP.
 * @param next - Función para pasar al siguiente middleware.
 * @returns Promesa que se resuelve cuando la validación del token se completa.
 *
 * Este middleware verifica si el encabezado de autorización contiene un token.
 * Si no se proporciona un token, responde con un estado 401 y un mensaje de error.
 * Si se proporciona un token, se envía una solicitud POST al servicio de autenticación
 * para validar el token. Si el token es válido, se llama a la función `next` para
 * continuar con el siguiente middleware. Si el token no es válido, responde con un
 * estado 401 y un mensaje de error.
 * 
 * Conexion con el microservicio de autenticacion
 */
export const validateTokenMsAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ msg: "No token provided" });
    return;
  }

  try {
    interface AuthResponse {
      success: boolean;
    }

    const response = await axios.post<AuthResponse>(
      "https://ms-auth-chi.vercel.app/ms/auth/validate-token",
      {},
      {
        headers: { Authorization: token },
      }
    );
    if (response.data.success) {
      next();
    } else {
      res.status(401).json({ msg: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
    return;
  }
};
