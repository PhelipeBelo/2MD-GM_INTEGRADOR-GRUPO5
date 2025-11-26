import { getConnection } from '../config/database.js';

class ProdutoModel {
    
    // CRIAR NA TABELA equipamentos_ga
    static async criar(dados) {
        const connection = await getConnection();
        try {
            // Importante: Campos mapeados para o seu banco
            const sql = `INSERT INTO equipamentos_ga (nome, marca, serie, descricao, foto_url, eq_status) VALUES (?, ?, ?, ?, ?, ?)`;
            const [result] = await connection.query(sql, [
                dados.nome, 
                dados.marca, 
                dados.serie, 
                dados.descricao,
                dados.foto_url,  
                dados.status || 'Disponível'
            ]);
            return result.insertId;
        } finally {
            connection.release();
        }
    }

    // ATUALIZAR
    static async atualizar(id, dados) {
        const connection = await getConnection();
        try {
            const campos = [];
            const valores = [];

            if (dados.nome) { campos.push('nome = ?'); valores.push(dados.nome); }
            if (dados.marca) { campos.push('marca = ?'); valores.push(dados.marca); }
            if (dados.serie) { campos.push('serie = ?'); valores.push(dados.serie); }
            if (dados.descricao) { campos.push('descricao = ?'); valores.push(dados.descricao); }
            if (dados.foto_url) { campos.push('foto_url = ?'); valores.push(dados.foto_url); }
            if (dados.status) { campos.push('eq_status = ?'); valores.push(dados.status); }

            if (campos.length === 0) return 0;

            valores.push(id); 
            const sql = `UPDATE equipamentos_ga SET ${campos.join(', ')} WHERE id = ?`;

            const [result] = await connection.query(sql, valores);
            return result.affectedRows;
        } finally {
            connection.release();
        }
    }

    // EXCLUIR
    static async excluir(id) {
        const connection = await getConnection();
        try {
            const sql = `DELETE FROM equipamentos_ga WHERE id = ?`;
            const [result] = await connection.query(sql, [id]);
            return result.affectedRows;
        } finally {
            connection.release();
        }
    }

    // LISTAR TODOS
    static async listarTodos() {
        const connection = await getConnection();
        try {
            const sql = `SELECT * FROM equipamentos_ga ORDER BY id DESC`;
            const [rows] = await connection.query(sql);
            return { produtos: rows }; 
        } finally {
            connection.release();
        }
    }

    // BUSCAR POR ID
    static async buscarPorId(id) {
        const connection = await getConnection();
        try {
            const sql = `SELECT * FROM equipamentos_ga WHERE id = ?`;
            const [rows] = await connection.query(sql, [id]);
            return rows[0];
        } finally {
            connection.release();
        }
    }
}

export default ProdutoModel;