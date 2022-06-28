const express = require('express');
const rota = express.Router();

const usuarioController = require('../controller/usuario_controller');

rota.post('/',usuarioController.realizarLogin);

module.exports = rota;