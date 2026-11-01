import { Request, Response } from "express";

export function publicContent(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: { message: "Contenido publico: cualquiera puede verlo, sin iniciar sesion." },
  });
}

export function privateContent(req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: { message: "Contenido privado: solo para usuarios autenticados.", userId: req.userId, role: req.userRole },
  });
}

export function adminContent(req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: { message: "Contenido de administracion: solo para usuarios con rol ADMIN.", userId: req.userId, role: req.userRole },
  });
}
