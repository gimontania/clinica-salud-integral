import prisma from "../config/prisma.js";

//creamos un paciente
export const createPaciente = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    fechaNacimiento: Date;
}) => {
    return await prisma.paciente.create({
        data,
    });
};

//obtenemos todos los pacientes
export const getAllPacientes = async () => {
    return await prisma.paciente.findMany({
        orderBy: {
            id: "asc",
        },
    });
};

//obtener un paciente por ID
export const getPacienteById = async (id: number) => {
    return await prisma.paciente.findUnique({
        where: {
            id,
        },
        include:{
            citas:{
                //incluimos médico y especialidad en cada cita
                include: {
                    medico: {
                        include:{
                            especialidad: true,
                        },
                    },
                },
                //primero citas más recientes 
                orderBy:{
                    fecha: "desc",
                },
            },
        },
    });
};