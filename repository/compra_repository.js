const {Client} = require('pg');



const conexao = {
    host: 'ec2-3-226-163-72.compute-1.amazonaws.com',
    port: 5432,
    user: 'ircvbktwiwbrer',
    password: '972dfee616319624d758630eba60f0c321a08afa0ff0dd4470a3ce870acc6c8e',
    database: 'd22f85edakolpr',
    ssl: true
};




exports.listar = async () => {
    const cliente = new Client(conexao);
    cliente.connect();
    try{ 
        const resultado = await cliente.query("SELECT * from compra");
        cliente.end();
        return (resultado.rows);
    }
    catch (err) { throw err; }
}


exports.buscarUltimoId = async () => {
    const sql = "SELECT id_compra FROM compra ORDER BY id_compra DESC LIMIT 1";

    const cliente = new Client(conexao);
    cliente.connect();

    try{
        const resultado = await cliente.query(sql);
        cliente.end();
        console.log(resultado.rows);
        if(!resultado.rows.length){
            return(1);
        }
        else{
            return(resultado.rows[0].id_compra + 1);
        }
    }
    catch (err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500; 
        throw error; 
    }
}

exports.buscarPorIdCliente = async (id) => {
    const sql = "SELECT * FROM compra WHERE id_cliente=$1";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();

    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        return(resultado.rows);        
    }
    catch (err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500; 
        throw error; 
    }
}

exports.buscarPorId = async (id) => {
    const sql = "SELECT * FROM compra WHERE id=$1";
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

exports.inserir = async (compra) => {

    var sql = "INSERT INTO compra (id_compra, id_cliente, id_produto, data) VALUES "
    compra.produtos.forEach(element => {
        sql = `${sql}('${compra.id_compra}','${compra.id_cliente}','${element.id_produto}','${compra.data}'),`;
    });
    var sql = `${sql.slice(0, -1)} RETURNING *`;

    const cliente = new Client(conexao);
    cliente.connect();
    
    try{
        const resultado = await cliente.query(sql);
        cliente.end();
        return(resultado);
    }
    catch(err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500; 
        throw error; 
    }
}

exports.atualizar = async (id, compra) => {
    const sql = "UPDATE compra SET nome=$1, email=$2, username=$3, senha=$4 WHERE id=$5 RETURNING *";
    const values = [compra.nome, 
        compra.email, 
        compra.username,
        compra.senha,
        id
    ];

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

exports.deletar = async (id) => {
    const sql = "DELETE FROM compra WHERE id=$1 RETURNING *";
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

exports.buscarPorUsername = async (username) => {
    const sql = "SELECT * FROM compra WHERE username=$1";
    const values = [username];

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


