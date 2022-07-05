const express = require('express');
const rota = express.Router();

const controller = require('../controller/compra_controller');

rota.get('/',controller.listar);
rota.get('/:id', controller.buscarPorId);
rota.get('/cliente/:id', controller.buscarPorIdCliente);
rota.post("/", controller.inserir);
rota.delete("/:id", controller.deletar);
rota.put("/:id", controller.atualizar);

module.exports = rota;