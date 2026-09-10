import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

//registramos usuario
router.post("/register", register);

//iniciamos sesion
router.post("/login", login);

export default router;