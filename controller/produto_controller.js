
const produtoNegocio = require('../negocio/produto_negocio');

exports.listar = async (req, res) => {
    try{ 
        const lista = await produtoNegocio.listar();
        res.json(lista);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

exports.buscarPorId = async (req, res) => {
    const id = req.params.id;
    try{
        const produto = await produtoNegocio.buscarPorId(id);
        res.json(produto);                
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
    const produto = req.body;
    
    try{ 
        const produtoInserido = await produtoNegocio.inserir(produto);
        res.status(201).json(produto);
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

exports.atualizar = async(req, res) => {
    const id = req.params.id;  
    const produto = req.body;
  
    try{
        const produtoAlterado = await produtoNegocio.atualizar(id, produto);
        res.json(produtoAlterado);                
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

exports.deletar = async (req, res) => {
    const id = req.params.id;    
    
    try{
        const produto = await produtoNegocio.deletar(id);
        res.json(produto);                
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