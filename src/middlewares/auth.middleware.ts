import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//datos que guardaremos dentro del token
export interface AuthPayload {
    id: number;
    email: string;
    role: "RECEPCIONISTA" | "MEDICO" | "GERENCIA";
}

//Agregamos "user" al objeto Request de express
declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}

//Verifica que exista un token válido
export function verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
){
    const header = req.headers.authorization;

    //verificamos que llegue como bearer token
    if (!header || !header.startsWith("Bearer ")){
        return res.status(401).json({
            message: "Token no proporcionado",
        });
    }

    const token = header.split(" ")[1];

    try{
        //verificamos el token usando nuestro secreto
        req.user = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as AuthPayload;

        next();
    } catch{
        return res.status(401).json({
            message: "Token inválido o expirado"
        });
    }
}