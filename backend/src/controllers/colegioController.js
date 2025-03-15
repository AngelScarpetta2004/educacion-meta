// backend/src/controllers/colegiosController.js
const prisma = require('../prisma/prismaClient');

exports.getColegios = async (req, res) => {
    const colegios = await prisma.colegio.findMany();
    res.json(colegios);
};

exports.createColegio = async (req, res) => {
    const { nombre, municipioId } = req.body;
    const nuevoColegio = await prisma.colegio.create({
        data: { nombre, municipioId }
    });
    res.json(nuevoColegio);
};

exports.deleteColegio = async (req, res) => {
    const { id } = req.params;
    await prisma.colegio.delete({ where: { id: Number(id) } });
    res.json({ message: 'Colegio eliminado' });
};