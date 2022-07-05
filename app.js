const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const clienteController = require('./controller/cliente_controller');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// const loginRota = require('./rotas/login_rota');
// app.use('/api/login', loginRota);

// app.use(usuarioController.validaToken);

const produtoRota = require('./rotas/produto_rota');
app.use('/api/produtos', produtoRota);

const clienteRota = require('./rotas/cliente_rota');
app.use('/api/cliente', clienteRota);

const compraRota = require('./rotas/compra_rota');
app.use('/api/compra', compraRota);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
