const clienteNegocio = require('../negocio/cliente_negocio');

const jwt = require('jsonwebtoken');

exports.listar = async (req, res) => {
    try{ 
        const lista = await clienteNegocio.listar();
        res.json(lista);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

exports.buscarPorId = async (req, res) => {
    const id = req.params.id;
    try{
        const cliente = await clienteNegocio.buscarPorId(id);
        res.json(cliente);                
    }
    catch (err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});            
        }
    }
}

exports.inserir = async (req, res) => {
    const cliente = req.body;
    
    try{ 
        const clienteInserido = await clienteNegocio.inserir(cliente);
        res.status(201).json(cliente);
    }
    catch(err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});            
        }
    }   
}

exports.deletar = async (req, res) => {
    const id = req.params.id;    
    
    try{
        const cliente = await clienteNegocio.deletar(id);
        res.json(cliente);                
    }
    catch (err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});            
        }
    }
}

exports.atualizar = async(req, res) => {
    const id = req.params.id;  
    const cliente = req.body;
  
    try{
        const clienteAlterado = await clienteNegocio.atualizar(id, cliente);
        res.json(clienteAlterado);                
    }
    catch (err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});            
        }
    }    
}

exports.buscarPorUsername = async (req, res) => {
    const query = req.query;
    if(query && query.username){ 
        try{
            const cliente = await clienteNegocio.buscarPorUsername(query.username);
            res.json(cliente);                
        }
        catch (err) {
            if(err.status) {
                res.status(err.status).json(err);
            }
            else {
                res.status(500).json({message: "Erro nao identificado"});            
            }
        }
    }
    else {
        //Bad Request
        res.status(400).json({message: "Falta o parametro de busca username"});
    }
}

//Verificar com o negocio para validar o cliente,
//e controller trabalhar na parte de Token
// exports.realizarLogin = async (req, res) => {
//     const userLogin = req.body;
//     try { 
//         const cliente = await clienteNegocio.validarcliente(userLogin);

//         const token = jwt.sign({
//             id: cliente.id,
//             nome: cliente.nome
//         }, "Senac@2022", { expiresIn: '1h' });
//         res.status(201).json({"token": token});
//     }
//     catch(err) {
//         if(err.status) {
//             res.status(err.status).json(err);
//         }
//         else {
//             res.status(500).json({message: "Erro nao identificado"});            
//         }
//     }
// }

// exports.validaToken = (req, res, next) => {
//     const token = req.get('Authorization');
//     if(token) {
//         try{
//             const payload = jwt.verify(token, 'Senac@2022');
//             console.log("[ValidaToken] Payload",payload);
//             next();
//         }
//         catch(err){
//             res.status(403).json({mensagem:"Sem Token de acesso"});
//         }        
//     }
//     else {
//         res.status(403).json({mensagem:"Sem Token de acesso"});
//     }
// }

