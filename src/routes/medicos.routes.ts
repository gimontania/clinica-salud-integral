import { Router } from "express";
import { obtenerMedicos } from "../controllers/medico.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { obtenerAgendaMedico } from "../controllers/appointment.controller.js";


const router = Router();

//obtenemos todos los médicos con filtro opcional de especialidad
router.get("/", verifyToken, authorize("RECEPCIONISTA"), obtenerMedicos);

//obtenemos la agenda de un médico
router.get( 
    "/:id/appointments", 
    verifyToken,
    authorize("MEDICO"),
    obtenerAgendaMedico
);


export default router;