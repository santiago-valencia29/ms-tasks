import axios from "axios";
import { Request, Response, NextFunction } from "express";

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
