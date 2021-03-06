const express = require('express');
const rota = express.Router();

const controller = require('../controller/cliente_controller');

rota.get('/',controller.listar);
rota.get('/busca', controller.buscarPorUsername);
rota.get('/:id', controller.buscarPorId);
rota.post("/", controller.inserir);
rota.delete("/:id", controller.deletar);
rota.put("/:id", controller.atualizar);

module.exports = rota;