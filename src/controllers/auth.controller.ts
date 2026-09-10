import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

//registramos un usuario
export const register = async (req: Request, res: Response) => {
    try{
        const { email, password, role } = req.body;

        //encriptamos la constraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
            },
            select: {
                id: true,
                email: true,
                role: true,
            },
        });

        return res.status(201).json(user);
    } catch(error){
        console.error(error);
            return res.status(500).json({
                message: "Error al registrar el usuario",
            });
        }
    };

    //iniciamos sesión
    export const login = async (req: Request, res: Response) => {
        try{
            const { email, password } = req.body;

            //buscamos el usuario por email
            const user = await prisma.user.findUnique({
                where: { email },
            });

            //si no existe o la contraseña no coincide
            if (!user || !(await bcrypt.compare(password, user.password))){
                return res.status(401).json({
                    message: "Credenciales inválidas",
                });
            }

            //creamos el token con los datos del usuario
            const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "8h",
            }
        );

        return res.json({ token});
        } catch(error){
            console.error(error);
            return res.status(500).json({
                message:"Error de autenticación",
            });
        }
        };
