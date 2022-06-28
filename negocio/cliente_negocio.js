const clienteRepository = require('../repository/cliente_repository');

exports.listar = async () => {
    try { 
    const listaClientes = await clienteRepository.listar();
    return listaClientes;
    } catch(err) { throw err; }
}

exports.buscarPorId = async (id) => {
    try {
        const cliente = await clienteRepository.buscarPorId(id);
        if(!cliente){
            let erro = new Error();
            erro.message = "cliente nao encontrado";
            erro.status = 404;
            throw erro;
        }
        else {
            return cliente;
        }
    }
    catch(err) {
        throw err;
    }
}

exports.inserir = async (cliente) => {
    if(cliente && (cliente.nome && cliente.idade &&
        cliente.cidade)){
        try{
            const clienteInserido = await clienteRepository.inserir(cliente);
            return clienteInserido;
        }
        catch(err) {
            throw err;  
        }
        
    }
    else {
        let erro = {}
        erro.message = "Falta parametros de cliente";
        erro.status = 400;
        throw erro;
    }

}

exports.atualizar = async (id, cliente) => {

    if(cliente && (cliente.nome || cliente.idade ||
        cliente.cidade || cliente.pontos)) {

    try {
        const clienteDB = await clienteRepository.buscarPorId(id);
        if(!clienteDB){
            let erro = new Error();
            erro.message = "cliente nao encontrado";
            erro.status = 404;
            throw erro;
        }
        
        console.log("cliente",cliente);

        const clienteAlterado = await clienteRepository.atualizar(id,cliente);
        return clienteAlterado;

    }
    catch(err) {
        throw err;
        }
    }
    else {
        let erro = {}
        erro.message = "Falta parametros de cliente";
        erro.status = 400;
        throw erro;        
    }
}

exports.deletar = async (id) => {
    try {
        const cliente = await clienteRepository.deletar(id);
        if(!cliente){
            let erro = new Error();
            erro.message = "cliente nao encontrado";
            erro.status = 404;
            throw erro;
        }
        else {
            return cliente;
        }
    }
    catch(err) {
        throw err;
    }
}

exports.buscarPorUsername = async (username) => {
    try {
        const cliente = await clienteRepository.buscarPorUsername(username);
        if(!cliente){
            let erro = new Error();
            erro.message = "cliente nao encontrado";
            erro.status = 404;
            throw erro;
        }
        else {
            return cliente;
        }
    }
    catch(err) {
        throw err;
    }
}

exports.validarcliente = async (userLogin) => {
    try {
        if(userLogin && userLogin.username && userLogin.senha) {
            const cliente = await clienteRepository.buscarPorUsername(userLogin.username);

            if(cliente && cliente.senha == userLogin.senha){
                return cliente;
            }
        }

        let erro = new Error();
        erro.message = "cliente ou senha invalidos";
        erro.status = 401;
        throw erro;
    }
    catch(err) {
        throw err;
    }
}