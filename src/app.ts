import express from "express";
import cors from "cors";
import especialidadesRoutes from "./routes/especialidades.routes.js";
import pacientesRoutes from "./routes/pacientes.routes.js";
import medicosRoutes from "./routes/medicos.routes.js";
import authRoutes from "./routes/auth.routes.js";
import appointmentsRoutes from "./routes/appointments.routes.js";


const app = express();

//middlewares
app.use(cors());
app.use(express.json());


//rutas
app.use("/api/especialidades", especialidadesRoutes);
app.use("/api/pacientes", pacientesRoutes);
app.use("/api/medicos", medicosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentsRoutes);

export default app;