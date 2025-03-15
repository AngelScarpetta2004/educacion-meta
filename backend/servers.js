require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Obtener todos los colegios
app.get("/colegios", async (req, res) => {
  try {
    const colegios = await prisma.colegio.findMany({
      include: { municipio: true, sede: true }, // Relación con municipio y sede
    });
    res.json(colegios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener colegios" });
  }
});

// Obtener todos los municipios
app.get("/municipios", async (req, res) => {
  try {
    const municipios = await prisma.municipio.findMany({
      include: { departamento: true, colegio: true },
    });
    res.json(municipios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener municipios" });
  }
});

// Obtener todos los departamentos
app.get("/departamentos", async (req, res) => {
  try {
    const departamentos = await prisma.departamento.findMany({
      include: { municipio: true },
    });
    res.json(departamentos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener departamentos" });
  }
});

// Obtener todas las sedes
app.get("/sedes", async (req, res) => {
  try {
    const sedes = await prisma.sede.findMany({
      include: { colegio: true },
    });
    res.json(sedes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener sedes" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
