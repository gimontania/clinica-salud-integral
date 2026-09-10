import { Request, Response } from "express";
import { getAllMedicos } from "../models/medico.model.js";

//obtenemos todos los médicos, con filto opcional por especialidad
export const obtenerMedicos = async (req: Request, res: Response) => {
    try{
        const especialidadNombre = req.query.especialidad as string | undefined;

        const medicos = await getAllMedicos(especialidadNombre);

        return res.status(200).json(medicos);
    } catch(error) {
        return res.status(500).json({
            message: "Error al obtener los médicos",
        });
    }
};