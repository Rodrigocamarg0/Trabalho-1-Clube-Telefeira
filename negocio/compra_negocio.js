const compraRepository = require('../repository/compra_repository');
const clienteRepository = require('../repository/cliente_repository');
const produtoRepository = require('../repository/produto_repository');


exports.listar = async () => {
    try {
        const listacompras = await compraRepository.listar();
        return listacompras;
    } catch (err) { throw err; }
}

exports.buscarPorId = async (id) => {
    try {

        const compra = await compraRepository.buscarPorId(id);

        if (!compra) {
            let erro = new Error();
            erro.message = "compra nao encontrado";
            erro.status = 404;
            throw erro;
        }
        else {
            return compra;
        }
    }
    catch (err) {
        throw err;
    }
}


exports.buscarPorIdCliente = async (id) => {
    try {

        const compra = await compraRepository.buscarPorIdCliente(id);

        if (!compra) {
            let erro = new Error();
            erro.message = "Cliente não encontrado";
            erro.status = 404;
            throw erro;
        }
        else {

            let listaProdutos = []
            let dadosDoProduto = {}

            const produtos = await produtoRepository.listar(id);

            compra.forEach(element => {
                listaProdutos.push(element.id_produto);
            });
            
            
            listaProdutos.forEach(item => {
                produtos.forEach(element => {
                    if (item === element.id){
                        dadosDoProduto[element.id] = element
                    }
                });
            });

            listaProdutos = [...new Set(listaProdutos)];


            const groupByIdCompra = compra.reduce((group, compra) => {
                const { id_compra } = compra;
                group[id_compra] = group[id_compra] ?? [];
                group[id_compra].push(compra);
                return group;
            }, {});

            let objCompras = {}

            for (const key in groupByIdCompra) {
                objCompras[key] = {
                    id_cliente: groupByIdCompra[key][0].id_cliente,
                    data: groupByIdCompra[key][0].data,
                    produtos: groupByIdCompra[key].map(produto => dadosDoProduto[produto.id_produto])
                };
            }

            return objCompras;



        }
    }
    catch (err) {
        throw err;
    }
}

exports.inserir = async (compra) => {

    const clienteExistir = await clienteRepository.existe(compra.id_cliente);
    console.log(clienteExistir);

    var now = new Date();
    now = now.toISOString();

    if (clienteExistir) {
        if (compra && (compra.produtos && compra.id_cliente)) {

            const ultimoID = await compraRepository.buscarUltimoId();

            try {

                const itemCompra = {
                    id_compra: ultimoID,
                    id_cliente: compra.id_cliente,
                    produtos: compra.produtos,
                    data: now
                }
                const compraInserida = await compraRepository.inserir(itemCompra);

                return compraInserida;
            }
            catch (err) {
                throw err;
            }

        }
        else {
            let erro = {}
            erro.message = "Falta parametros de compra";
            erro.status = 400;
            throw erro;
        }
    }
    else {
        let erro = {}
        erro.message = "Cliente não encontrado";
        erro.status = 400;
        throw erro;
    }

}

exports.atualizar = async (id, compra) => {

    if (!compra || (!compra.nome && !compra.preco)) {
        let erro = {}
        erro.message = "Falta parametros de compra";
        erro.status = 400;
        throw erro;
    }

    try {
        const compraDB = await compraRepository.buscarPorId(id);
        if (!compraDB) {
            let erro = new Error();
            erro.message = "compra nao encontrado";
            erro.status = 404;
            throw erro;
        }

        compra.nome = compra.nome || compraDB.nome;
        compra.preco = compra.preco || compraDB.preco;

        const compraAlterado = await compraRepository.atualizar(id, compra);
        return compraAlterado;

    }
    catch (err) {
        throw err;
    }
}

exports.deletar = async (id) => {
    try {
        const compra = await compraRepository.deletar(id);
        if (!compra) {
            let erro = new Error();
            erro.message = "compra nao encontrado";
            erro.status = 404;
            throw erro;
        }
        else {
            return compra;
        }
    }
    catch (err) {
        throw err;
    }
}
