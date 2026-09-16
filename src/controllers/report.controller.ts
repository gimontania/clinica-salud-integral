import { Request, Response } from "express";
import { getAppointmentsBySpeciality, getDailyCutoff, } from "../models/report.model.js";

//obtenemos el reporte de citas agrupadas por especialidad
export const getAppointmentsBySpecialityController = async (
    req: Request, 
    res: Response
) => {
    try {
        const report = await getAppointmentsBySpeciality();

        return res.status(200).json(report);
    } catch(error){
        return res.status(500).json({
            message: "Error al obtener el reporte de citas por especialidad",
        });
    }
};


//obtenemos el corte diario de citas
export const getDailyCutoffController = async (
    req: Request,
    res: Response 
)=> {
    try {
        //convertimos la fecha recibida como yyy-mm-dd
        const [year, month, day] = (req.query.date as string).split("-").map(Number);
        const date = new Date(year, month -1, day);


        //obtenemos el reporte del día
        const report = await getDailyCutoff(date);

        return res.status(200).json(report);
    }catch(error) {
        return res.status(500).json({
            message: "Error al obtener el corte diario",
        });
    }        
    };