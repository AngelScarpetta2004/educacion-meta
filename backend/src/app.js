// backend/src/app.js
const express = require('express');
const cors = require('cors');
const colegiosRoutes = require('./routes/colegios');
const municipiosRoutes = require('./routes/municipios');
const sedesRoutes = require('./routes/sedes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/colegios', colegiosRoutes);
app.use('/api/municipios', municipiosRoutes);
app.use('/api/sedes', sedesRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

module.exports = app;