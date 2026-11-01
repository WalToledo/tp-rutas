// Aggregates every v1 resource router. New entities get mounted here, not in server.ts.
import { Router } from "express";
import authRouter from "./auth.routes";
import demoRouter from "./demo.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/", demoRouter);

export default router;
