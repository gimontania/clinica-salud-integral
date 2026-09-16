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

//obtenemos la agenda de un médico, con filtro opcional de fechas
export const getDoctorAgenda = async (
    medicoId: number,
    from?: Date,
    to?: Date,
) => {
    return await prisma.cita.findMany({
        where: {
            medicoId,

            //si llegan ambas fechas, filtramos por ese rango
            ...(from && to
                ? {
                    fecha: {
                        gte: from,
                        lte: to,
                    },
                }
                : {}),
        },

            //incluimos los datos del paciente
            include: {
                paciente: true,
            },

            //ordenamos las citas de la más próxima a la más lejana
            orderBy: {
                fecha: "asc",
            },        
    });
};


//actualizamos el estado de una cita
export const updateAppointmentStatus = async (
    id: number,
    estado: "COMPLETADA" | "CANCELADA"
) => {
    return await prisma.cita.update({
        where: { id },

        //actualizamos solamente el estado
        data: {
            estado,
        },
    });
};