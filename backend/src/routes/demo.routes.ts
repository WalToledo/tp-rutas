// Los tres tipos de ruta del TP: publica, privada y privada protegida por rol.
import { Router } from "express";
import { publicContent, privateContent, adminContent } from "../controllers/demo.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

router.get("/public", publicContent);
router.get("/private", authMiddleware, privateContent);
router.get("/admin", authMiddleware, requireRole("ADMIN"), adminContent);

export default router;
