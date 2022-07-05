
const compraNegocio = require('../negocio/compra_negocio');

exports.listar = async (req, res) => {
    try{ 
        const lista = await compraNegocio.listar();
        res.json(lista);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

exports.buscarPorId = async (req, res) => {
    const id = req.params.id;
    try{
        const compra = await compraNegocio.buscarPorId(id);
        res.json(compra);                
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

exports.buscarPorIdCliente = async (req, res) => {
    const id = req.params.id;
    try{
        const compra = await compraNegocio.buscarPorIdCliente(id);
        res.json(compra);                
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
    const compra = req.body;
    
    try{ 
        const compraInserido = await compraNegocio.inserir(compra);
        console.log(compraInserido);
        res.status(201).json(compraInserido);
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
        const compra = await compraNegocio.deletar(id);
        res.json(compra);                
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
    const compra = req.body;
  
    try{
        const compraAlterado = await compraNegocio.atualizar(id, compra);
        res.json(compraAlterado);                
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