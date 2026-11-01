// Protege rutas por rol: se usa DESPUES de authMiddleware, que es quien setea req.userRole.
import { Request, Response, NextFunction } from "express";
import { UserRole } from "../types/auth.types";

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.userRole) {
      res.status(401).json({ success: false, error: { message: "Sesion requerida" } });
      return;
    }

    if (!allowedRoles.includes(req.userRole)) {
      res.status(403).json({ success: false, error: { message: "No tenes permisos para acceder a este recurso" } });
      return;
    }

    next();
  };
}
