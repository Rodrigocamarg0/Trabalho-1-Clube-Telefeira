const compraRepository = require('../repository/compra_repository');
const clienteRepository = require('../repository/cliente_repository');
const produtoRepository = require('../repository/produto_repository');


exports.consulta = async (id) => {
    try {

        const cliente = await clienteRepository.buscarPorId(id);

        if (!cliente) {
            let erro = new Error();
            erro.message = "Cliente nao encontrado";
            erro.status = 404;
            throw erro;
        }
        else {
            return { pontos: cliente.pontos };
        }
    }
    catch (err) {
        throw err;
    }
}

// Cada real gasto vale 0.5 verducoins (pontos)
// Funcao para atualizar valor dos pontos na tabela do cliente
exports.atualizar = async (id) => {
    try {

        // Busca pelas compras do cliente
        const compras = await compraRepository.buscarPorIdCliente(id);

        // Busca pelos produtos com o valor em numeral (ex. 1.5)
        const precoProdutos = await produtoRepository.listarPreco();


        if (!compras || !precoProdutos) {
            let erro     = new Error();
            erro.message = "Cliente nao encontrado";
            erro.status  = 404;
            throw erro;
        }
        else {
            let totalPontos = 0
            compras.forEach(item => {
                totalPontos += precoProdutos[item.id_produto] * 0.5
            });
            totalPontos = totalPontos.toFixed(2); 
            totalPontos   = parseFloat(totalPontos);
            const update = true;
            console.log(update);
            if(update){
                const pontuacaoAtualizada = await clienteRepository.atualizar(id, { "pontos" : totalPontos });
            }
            return { pontos: totalPontos };
        }
    }
    catch (err) {
        throw err;
    }
}
