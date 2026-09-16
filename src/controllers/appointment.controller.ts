import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { createAppointment, getDoctorAgenda, updateAppointmentStatus, } from "../models/appointment.model.js";
import { appointmentStatusSchema } from "../middlewares/validate-appointment.js";


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


//obtenemos la agenda de un médico
export const obtenerAgendaMedico = async ( req: Request, res: Response) => {
    try{
        const medicoId = Number(req.params.id);

        //obtenemos las fechas desde los query params
        const from = req.query.from
        ? new Date(req.query.from as string)
        : undefined;

        const to = req.query.to 
        ? new Date(req.query.to as string)
        : undefined;

        //obtenemos las citas del médico
        const citas = await getDoctorAgenda(medicoId, from, to);

        return res.status(200).json(citas);          
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener la agenda del médico",
        });
    }
};


//actualizamos el estado de una cita
export const cambiarEstadoAppointment = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        //validamos el estado recibido
        const resultado = appointmentStatusSchema.safeParse(req.body);

        if (!resultado.success) {
            return res.status(400).json({
                message: "Estado no válido",
                errors: resultado.error?.issues,
            });
        }

        //actualizamos el estado de la cita
        const cita = await updateAppointmentStatus(
            id,
            resultado.data.estado
        );

        return res.status(200).json(cita);
    } catch (error) {
        //verificamos si el error contiene el código de prisma
        if(
            error instanceof Error &&
            "code" in error &&
            error.code === "P2025"
        ) {
            return res.status(404).json({
                message: "Cita no encontrada",
            });
        }

        return res.status(500).json({
            message: "Error al actualizar el estado de la cita",
        });
    }
};
