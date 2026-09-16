import { Router } from "express";
import { getAppointmentsBySpecialityController, getDailyCutoffController, } from "../controllers/report.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

//Reporte de citas por especialidad (solo gerencia)
router.get(
    "/appointments-by-specialty",
    verifyToken,
    authorize("GERENCIA"),
    getAppointmentsBySpecialityController
);


//corte diario de citas (solo gerencia)
router.get(
    "/daily-cutoff",
    verifyToken,
    authorize("GERENCIA"),
    getDailyCutoffController
);



export default router;

