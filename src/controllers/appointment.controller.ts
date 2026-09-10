import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { createAppointment } from "../models/appointment.model.js";

//creamos una cita
export const crearAppointment = async (req: Request, res: Response) => {
    try{
        const { pacienteId, medicoId, fecha } = req.body;

        //verificamos que el paciente exista
        const paciente = await prisma.paciente.findUnique({
            where: { id: pacienteId },
        });

        if (!paciente) {
            return res.status(404).json({
                message: "Paciente no encontrado",
            });
        }

        //verificamos que el medico exista
        const medico = await prisma.medico.findUnique({
            where: { id: medicoId },
        });

        if (!medico) {
            return res.status(404).json({
                message: "Médico no encontrado",
            });
        }

        //creamos la cita
        const cita = await createAppointment({
            pacienteId, medicoId, fecha,
        });

        return res.status(201).json(cita);
    } catch(error) {
        return res.status(500).json({
            message: "Error al crear la cita",
        });
    }
};