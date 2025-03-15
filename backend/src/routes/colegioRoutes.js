// backend/src/routes/colegiosRoutes.js
const express = require('express');
const router = express.Router();
const { getColegios, createColegio, deleteColegio } = require('../controllers/colegiosController');

router.get('/', getColegios);
router.post('/', createColegio);
router.delete('/:id', deleteColegio);

module.exports = router;