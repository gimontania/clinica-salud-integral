import prisma from "../config/prisma.js";

//obtenemos la cantidad de citas agrupadas por especialidad
export const getAppointmentsBySpeciality = async () => {
    return await prisma.$queryRaw`
    SELECT
    e.name AS especialidad,
    COUNT(c.id)::int AS cantidad
    FROM citas c
    INNER JOIN medicos m ON c."medicoId" = m.id
    INNER JOIN especialidades e ON m."especialidadId" = e.id
    GROUP BY e.id, e.name
    ORDER BY cantidad DESC;
    `;
};

//obtenemos el corte diario de citas agrupadas por estado
export const getDailyCutoff = async (date: Date) => {
    //Definimos el principio y el final del dia
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await prisma.cita.groupBy({
        by: ["estado"],

        //filtramos las citas que pertenecen a ese día
        where: {
            fecha: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },

        //contamos cuántas citas hay en cada estado
        _count: {
            id: true,
        },

        orderBy: {
            estado: "asc",
        },
    });
};