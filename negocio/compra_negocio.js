const compraRepository = require('../repository/compra_repository');

exports.listar = async () => {
    try { 
    const listacompras = await compraRepository.listar();
    return listacompras;
    } catch(err) { throw err; }
}

exports.buscarPorId = async (id) => {
    try {
        
        const compra = await compraRepository.buscarPorId(id);
   
        if(!compra){
            let erro = new Error();
            erro.message = "compra nao encontrado";
            erro.status = 404;
            throw erro;
        }
        else {
            return compra;
        }
    }
    catch(err) {
        throw err;
    }
}

exports.inserir = async (compra) => {
    var now = new Date();    
    now = now.toISOString();

    if(compra && (compra.produtos && compra.id_cliente)){
        
                     
        const ultimoID = await compraRepository.buscarUltimoId();


        try{

            const itemCompra = {
                id_compra: ultimoID,
                id_cliente: compra.id_cliente,
                produtos: compra.produtos,
                data: now
            }
            const compraInserida = await compraRepository.inserir(itemCompra);
        
            return compraInserida;
        }
        catch(err) {
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

exports.atualizar = async (id, compra) => {
    
    if(!compra || (!compra.nome && !compra.preco)) {
        let erro = {}
        erro.message = "Falta parametros de compra";
        erro.status = 400;
        throw erro;        
    }

    try {
        const compraDB = await compraRepository.buscarPorId(id);
        if(!compraDB){
            let erro = new Error();
            erro.message = "compra nao encontrado";
            erro.status = 404;
            throw erro;
        }
        
        compra.nome = compra.nome || compraDB.nome;
        compra.preco = compra.preco || compraDB.preco;

        const compraAlterado = await compraRepository.atualizar(id,compra);
        return compraAlterado;

    }
    catch(err) {
        throw err;
    }
}

exports.deletar = async (id) => {
    try {
        const compra = await compraRepository.deletar(id);
        if(!compra){
            let erro = new Error();
            erro.message = "compra nao encontrado";
            erro.status = 404;
            throw erro;
        }
        else {
            return compra;
        }
    }
    catch(err) {
        throw err;
    }
}
