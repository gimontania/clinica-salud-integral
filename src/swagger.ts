import swaggerUi from "swagger-ui-express";
import { Express } from "express";

//configuración básica de swagger
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Clinica Salud Integral API",
        version: "1.0.0",
        description: "Documentación de la API de la Clinica Salud Integral",    
    },
    servers: [
        {
            url: "http://localhost:4000",
        },
    ],
    paths: {
        "/api/reports/appointments-by-specialty":{
            get: {
                summary: "Obtener citas agrupadas por especialidad",
                description: "Devuelve la cantidad de citas agrupadas por especialidad médica",
                responses: {
                    "200": {
                        description: "Reporte obtenido correctamente",
                    },
                    "401": {
                        description: "Token no proporcionado o inválido",
                    },
                    "403": {
                        description: "El usuario no tiene permisos de gerencia",
                    },
                    "500": {
                        description: "Error al obtener el reporte",
                    },
                },
            },
        },

        "/api/reports/daily-cutoff": {
            get: {
                summary: "Obtener corte diario de citas",
                description: "Devuelve la cantidad de citas agrupadas por estado para una fecha determinada",
                parameters: [
                    {
                        name: "date",
                        in: "query",
                        required: true,
                        description: "Fecha del reporte en formato yyy-mm-dd",
                        schema: {
                            type:"string",
                            example: "2026-09-10",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "Corte diario obtenido correctamente",
                    },
                    "401": {
                        description: "Token no proporcionado o inválido",
                    },
                    "403": {
                        description: "El usuario no tiene permisos de gerencia",
                    },
                    "500": {
                        description: "Error al obtener el corte diario",
                    },
                },
            },
        }
    },
};

//función para conectar swagger con express
export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};



