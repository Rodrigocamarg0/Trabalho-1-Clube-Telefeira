const produtoRepository = require('../repository/produto_repository');

exports.listar = async () => {
    try {
        const listaProdutos = await produtoRepository.listar();
        return listaProdutos;
    } catch (err) { throw err; }
}

exports.buscarPorId = async (id) => {
    try {
        const produto = await produtoRepository.buscarPorId(id);
        if (!produto) {
            let erro = new Error();
            erro.message = "Produto nao encontrado";
            erro.status = 404;
            throw erro;
        }
        else {
            return produto;
        }
    }
    catch (err) {
        throw err;
    }
}

exports.inserir = async (produto) => {
    if (produto && produto.nome && produto.preco) {
        try {
            const produtoInserido = await produtoRepository.inserir(produto);
            return produtoInserido;
        }
        catch (err) {
            throw err;
        }

    }
    else {
        let erro = {}
        erro.message = "Falta parametros de produto";
        erro.status = 400;
        throw erro;
    }

}

exports.atualizar = async (id, produto) => {

    if (produto && (produto.nome || produto.preco || produto.peso || produto.img_url)) {

        try {
            const produtoDB = await produtoRepository.buscarPorId(id);
            if (!produtoDB) {
                let erro = new Error();
                erro.message = "Produto nao encontrado";
                erro.status = 404;
                throw erro;
            }

            produto.nome = produto.nome || produtoDB.nome;
            produto.preco = produto.preco || produtoDB.preco;

            const produtoAlterado = await produtoRepository.atualizar(id, produto);
            return produtoAlterado;

        }
        catch (err) {
            throw err;
        }
    }
    else {
        let erro = {}
        erro.message = "Falta parametros de produto1";
        erro.status = 400;
        throw erro;
    }

}

exports.deletar = async (id) => {
    try {
        const produto = await produtoRepository.deletar(id);
        if (!produto) {
            let erro = new Error();
            erro.message = "Produto nao encontrado";
            erro.status = 404;
            throw erro;
        }
        else {
            return produto;
        }
    }
    catch (err) {
        throw err;
    }
}
