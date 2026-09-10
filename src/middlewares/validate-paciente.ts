import { z } from "zod";
import { Request, Response, NextFunction } from "express";

//validamos los datos que recibe un paciente
const pacienteSchema = z.object({
    firstName: z.string().min(1, "El nombre es obligatorio"),
    lastName: z.string().min(1, "El apellido es obligatorio"),
    email: z.email("El email no es válido"),

    //convierte el valor recibido y verifica que sea una fecha válida
    fechaNacimiento: z.coerce.date().refine(
        (fecha) => fecha <= new Date(),
        "La fecha de nacimiento no puede ser futura"
    ),
});

//middleware que ejecuta la validacion antes del controller
export const validatePaciente = (
    req:Request,
    res: Response,
    next: NextFunction
) => {
    const resultado = pacienteSchema.safeParse(req.body);

    //si los datos no son válidos, devolvemos 400
    if (!resultado.success){
        return res.status(400).json({
            message: "Datos no válidos",
            errors: resultado.error.issues,
        });
    }

    //reemplazamos el body con los datos validados
    req.body = resultado.data;

    next();
};