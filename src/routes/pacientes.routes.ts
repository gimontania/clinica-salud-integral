import { Router } from "express";
import { crearPaciente,obtenerPacientes, obtenerPacientePorId, } from "../controllers/paciente.controller.js";
import { validatePaciente } from "../middlewares/validate-paciente.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";


const router = Router();

//creamos paciente
router.post("/", verifyToken, authorize("RECEPCIONISTA"), validatePaciente, crearPaciente);

//obtenemos todos los pacientes
router.get("/", verifyToken, authorize("RECEPCIONISTA"), obtenerPacientes);

//obtener pacientes por id
router.get("/:id", verifyToken, authorize("RECEPCIONISTA"), obtenerPacientePorId);

export default router;