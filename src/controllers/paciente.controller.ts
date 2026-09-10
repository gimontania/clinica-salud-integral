import { Request, Response } from "express";
import { createPaciente, getAllPacientes, getPacienteById, } from "../models/paciente.model.js";


//creamos un paciente
export const crearPaciente = async (req: Request, res: Response) => {
    try{
        const paciente = await createPaciente(req.body);

        return res.status(201).json(paciente);
    } catch(error) {
        return res.status(500).json({
            message: "Error al crear el paciente",
        });
    }
};

//obtener todos los pacientes
export const obtenerPacientes = async (req: Request, res: Response) => {
    try{
        const paciente = await getAllPacientes();

        return res.status(200).json(paciente);
    } catch(error) {
        return res.status(500).json({
            message: "Error al obtener los pacientes",
        });
    }
};

//obtener un paciente por id
export const obtenerPacientePorId = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);

        const paciente = await getPacienteById(id);

        //Devolvemos 404 si no existe
        if(!paciente){
            return res.status(404).json({
                message: "Paciente no encontrado",
            });
        }

        return res.status(200).json(paciente);
    } catch(error) {
        return res.status(500).json({
            message: "Error al obtener los pacientes",
        });
    }
};