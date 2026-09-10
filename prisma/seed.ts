import { PrismaPg} from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL ?? "",
});

const prisma = new PrismaClient({ adapter });

async function main(){  //creamos las especialidades
    const clinica = await prisma.especialidad.create({ 
        data: { name: "Clínica Médica" },
    });

    const pediatria = await prisma.especialidad.create({
        data: { name: "Pediatria" },
    });

    const cardiologia = await prisma.especialidad.create({
        data: { name: "Cardiologia" },
    });

    //creamos dos médicos por especialidad
    await prisma.medico.createMany({
        data: [
        {
         firstName: "Martin",
         lastName: "Gonzalez",
         email: "martin@mainModule.com",
         especialidadId: clinica.id,
        },
        {
         firstName: "Ariel",
         lastName: "Faver",
         email: "ariel@mainModule.com",
         especialidadId: clinica.id,
        },
        {
         firstName: "Cristian",
         lastName: "Rodriguez",
         email: "cristian@mainModule.com",
         especialidadId: pediatria.id,
        },
        {
         firstName: "Jesica",
         lastName: "Fernandez",
         email: "jesica@mainModule.com",
         especialidadId: pediatria.id,
        },
        {
         firstName: "Leo",
         lastName: "Martinez",
         email: "leo@mainModule.com",
         especialidadId: cardiologia.id,
        },
        {
         firstName: "Andrea",
         lastName: "Boyer",
         email: "andrea@mainModule.com",
         especialidadId: cardiologia.id,
        },
    ],
});

    console.log("Seed ejecutado correctamente");
}

main()
.catch((error) => {
    console.error("error en el seed:", error);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
