const { Client } = require('pg');

const conexao = {
    host: 'ec2-3-226-163-72.compute-1.amazonaws.com',
    port: 5432,
    user: 'ircvbktwiwbrer',
    password: '972dfee616319624d758630eba60f0c321a08afa0ff0dd4470a3ce870acc6c8e',
    database: 'd22f85edakolpr',
    ssl: true
};



exports.listar = async () => {
    const client = new Client(conexao);
    client.connect();
    
    try {
        const resultado = await client.query("SELECT * from cliente");
        client.end();
        return (resultado.rows);
    }
    catch (err) { throw err; }
}

exports.buscarPorId = async (id) => {
    const sql = "SELECT * FROM cliente WHERE id=$1";
    const values = [id];

    const client = new Client(conexao);
    client.connect();

    try {
        const resultado = await client.query(sql, values);
        client.end();
        return (resultado.rows[0]);
    }
    catch (err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500;
        throw error;
    }
}

exports.inserir = async (cliente) => {
    const sql = "INSERT INTO cliente (nome, idade, cidade, pontos) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [
        cliente.nome,
        cliente.idade,
        cliente.cidade,
        0
    ];

    const client = new Client(conexao);
    client.connect();

    try {
        const resultado = await client.query(sql, values);
        client.end();
        return (resultado.rows[0]);
    }
    catch (err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500;
        throw error;
    }
}

exports.atualizar = async (id, cliente) => {
    // const sql = "UPDATE cliente SET nome=$1, idade=$2, cidade=$3, pontos=$4 WHERE id=$5 RETURNING *";
    // const values = [cliente.nome,
    // cliente.idade,
    // cliente.cidade,
    // 0,
    // cliente.id
    // ];
     
    const client = new Client(conexao);
    client.connect();

    var sql = "UPDATE cliente SET "
    var values = [];
    var count;

    const keys = Object.keys(cliente);

    keys.forEach((key, index) => {
        sql = `${sql}, ${key}=$${index+1}`;
        values.push(cliente[key]);
        count = index;
    });
    values.push(id);

    var sql = `${sql} WHERE id=$${count+2} RETURNING *`.replace(',', '')

    try {
        const resultado = await client.query(sql, values);
        client.end();
        return (resultado.rows[0]);
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
    const sql = "DELETE FROM cliente WHERE id=$1 RETURNING *";
    const values = [id];

    const client = new Client(conexao);
    client.connect();
    try {
        const resultado = await client.query(sql, values);
        client.end();
        return (resultado.rows[0]);
    }
    catch (err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500;
        throw error;
    }
}

exports.buscarPorCliente = async (cliente) => {
    const sql = "SELECT * FROM cliente WHERE username=$1";
    const values = [cliente];

    const client = new Client(conexao);
    client.connect();

    try {
        const resultado = await client.query(sql, values);
        client.end();
        return (resultado.rows[0]);
    }
    catch (err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500;
        throw error;
    }

}


