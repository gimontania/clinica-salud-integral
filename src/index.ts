import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 4000;

//levantamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});