import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "./auth.middleware.js";

//permitimos acceder a los roles indicados
export function authorize(...roles: AuthPayload["role"][]){
    return (req: Request, res: Response, next: NextFunction) => {

        //verificamos que el usuario exista y tenga permiso
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "No tienes permiso para acceder a este recurso",
            });
        }

        next();
    };
}