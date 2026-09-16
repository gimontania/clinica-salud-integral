import { z} from "zod";
import { Request, Response, NextFunction } from "express";

//validamos los datos necesarios para crear una cita
const appointmentSchema = z.object({
    pacienteId: z.number().int().positive(),
    medicoId: z.number().int().positive(),

    //convierte el valor recibido y verifica que la fecha no haya pasado
    fecha: z.coerce.date().min( //z.coerce.date convierte a date
        new Date(),
        "No se puede agendar una cita con una fecha que ya pasó"
    ),
});


//validamos los estados permitidos para actualizar una cita
export const appointmentStatusSchema = z.object({
    estado: z.enum(["COMPLETADA", "CANCELADA"]),
});

//middleware que ejecuta la validación del controller
export const validateAppointment = (
    req: Request, res: Response, next: NextFunction) => {
        const resultado = appointmentSchema.safeParse(req.body);

        //Devolvemos 400 si los datos no son válidos,
        if (!resultado.success) {
            return res.status(400).json({
                message: "Datos no válidos",
                errors: resultado.error.issues,
            });
        }

        //reemplazamos el body con los datos validados
        req.body = resultado.data;

        next();
    };