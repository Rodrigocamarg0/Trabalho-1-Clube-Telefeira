const {Client} = require('pg');

const conexao = {
    host: 'ec2-3-226-163-72.compute-1.amazonaws.com',
    port: 5432,
    user: 'ircvbktwiwbrer',
    password: '972dfee616319624d758630eba60f0c321a08afa0ff0dd4470a3ce870acc6c8e',
    database: 'd22f85edakolpr'
};

exports.listar = async () => {
    const cliente = new Client(conexao);
    cliente.connect();
    try{ 
        const resultado = await cliente.query("SELECT * from produto");
        cliente.end();
        return (resultado.rows);
    }
    catch (err) { throw err; }
}

<<<<<<< Updated upstream
=======


exports.listarPreco = async () => {
    const cliente = new Client(conexao);
    cliente.connect();
    try{ 
        const resultado = await cliente.query("SELECT id, preco::numeric FROM produto");
        let newResultadoObj = {}
        cliente.end();
        
        resultado.rows.forEach(prod => {
            newResultadoObj[prod.id] = prod.preco
        });

        return (newResultadoObj);
    }
    catch (err) { throw err; }
}

>>>>>>> Stashed changes
exports.buscarPorId = async (id) => {
    const sql = "SELECT * FROM produto WHERE id=$1";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();

    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        return(resultado.rows[0]);        
    }
    catch (err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500; 
        throw error; 
    }
}

exports.inserir = async (produto) => {
    const sql = "INSERT INTO produto(nome, preco, peso, img_url) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [produto.nome, produto.preco, produto.peso, produto.img_url];

    const cliente = new Client(conexao);
    cliente.connect();
    
    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        return(resultado.rows[0]);
    }
    catch(err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500; 
        throw error; 
    }
}

exports.atualizar = async (id, produto) => {
    // const sql = "UPDATE produtos SET nome=$1, preco=$2 WHERE id=$3 RETURNING *";
    // const values = [produto.nome, produto.preco, id];

    // const cliente = new Client(conexao);
    // cliente.connect();
    
    const cliente = new Client(conexao);
    cliente.connect();

    var sql = "UPDATE produto SET "
    var values = [];
    var count;

    const keys = Object.keys(produto);

    keys.forEach((key, index) => {
        sql = `${sql}, ${key}=$${index+1}`;
        values.push(produto[key]);
        count = index;
    });
    values.push(id);

    var sql = `${sql} WHERE id=$${count+2} RETURNING *`.replace(',', '')
    
    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        return(resultado.rows[0]);
    }
    catch (err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500; 
        throw error; 
    }
}

exports.deletar = async (id) => {
    const sql = "DELETE FROM produto WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        return(resultado.rows[0]);
    }
    catch (err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500; 
        throw error; 
    }
}


