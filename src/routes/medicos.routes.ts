import { Router } from "express";
import { obtenerMedicos } from "../controllers/medico.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

//obtenemos todos los médicos con filtro opcional de especialidad
router.get("/", verifyToken, authorize("RECEPCIONISTA"), obtenerMedicos);

export default router;
