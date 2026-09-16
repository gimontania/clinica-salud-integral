import { Router } from "express";
import { crearAppointment, cambiarEstadoAppointment, } from "../controllers/appointment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validateAppointment } from "../middlewares/validate-appointment.js";

const router = Router();

//creamos una cita
router.post(
    "/", 
    verifyToken, 
    authorize("RECEPCIONISTA"), 
    validateAppointment, 
    crearAppointment
);

//actualizamos el estado de una cita
router.patch(
    "/:id/status",
    verifyToken, 
    authorize("MEDICO"),
    cambiarEstadoAppointment
);



export default router;
