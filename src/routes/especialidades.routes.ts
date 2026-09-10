import { Router} from "express";
import prisma from "../config/prisma.js";

const router = Router();

//endpoint obtenemos todas las especialidades
router.get("/", async (req, res) => {
    try {
        const especialidades = await prisma.especialidad.findMany({
            orderBy: {
                name: "asc",
            },
        });

        res.json(especialidades);
    } catch(error) {
        console.error("Error al obtener especialidades:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;