import prisma from "../config/prisma.js";

//creamos una cita
export const createAppointment = async (data: {
    pacienteId: number;
    medicoId: number;
    fecha: Date;
}) => {
    return await prisma.cita.create({
        data,
    });
};