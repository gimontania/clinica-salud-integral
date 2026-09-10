import prisma from "../config/prisma.js";

//obtenemos todos los médicos y la especialidad
export const getAllMedicos = async (especialidadNombre?: string) => {
    return await prisma.medico.findMany({
        where: especialidadNombre ? {
            especialidad: {
                name: especialidadNombre,
            },
        } : undefined,
        include: {
            especialidad: true,
        },
        orderBy: {
            id: "asc",
        },
    });
};