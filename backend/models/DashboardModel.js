import { getConnection } from '../config/database.js';

class DashboardModel {

    // --- USUÁRIO (PagGL) ---
    static async listarDisponiveis() {
        const connection = await getConnection();
        try {
            const sql = `SELECT id, nome, serie AS codigo, marca AS categoria, eq_status AS status FROM equipamentos_ga WHERE eq_status = 'Disponível'`;
            const [rows] = await connection.query(sql);
            return rows;
        } finally { connection.release(); }
    }

    static async listarMeusEmprestimos(userId) {
        const connection = await getConnection();
        try {
            const sql = `SELECT emp.id, eq.nome, eq.serie AS codigo, emp.data_criacao AS dataRetirada, emp.local_uso AS local FROM equipamento_emp_ga emp INNER JOIN equipamentos_ga eq ON emp.equipamento_id = eq.id WHERE emp.gl_id = ? AND emp.status = 'Aprovado' AND emp.data_devolucao IS NULL`;
            const [rows] = await connection.query(sql, [userId]);
            return rows;
        } finally { connection.release(); }
    }

    static async listarMinhasSolicitacoes(userId) {
        const connection = await getConnection();
        try {
            const sql = `SELECT emp.id, eq.nome AS item, emp.data_criacao AS data, emp.status FROM equipamento_emp_ga emp INNER JOIN equipamentos_ga eq ON emp.equipamento_id = eq.id WHERE emp.gl_id = ? ORDER BY emp.data_criacao DESC`;
            const [rows] = await connection.query(sql, [userId]);
            return rows;
        } finally { connection.release(); }
    }

    static async verificarDisponibilidade(equipamentoId) {
        const connection = await getConnection();
        try {
            const sql = `
                SELECT id FROM equipamento_emp_ga 
                WHERE equipamento_id = ? 
                AND status IN ('Pendente', 'Aprovado', 'Em Uso')
            `;
            const [rows] = await connection.query(sql, [equipamentoId]);

            return rows.length === 0;
        } finally {
            connection.release();
        }
    }

    static async criarSolicitacao(dados) {
        const connection = await getConnection();
        try {
            const sql = `INSERT INTO equipamento_emp_ga (equipamento_id, gl_id, local_uso, status) VALUES (?, ?, ?, 'Pendente')`;
            const [result] = await connection.query(sql, [dados.equipamento_id, dados.usuario_id, dados.local_uso]);
            return result.insertId;
        } finally { connection.release(); }
    }

    // --- ADMIN (PagAdmin) ---

    static async listarTodosEquipamentos() {
        const connection = await getConnection();
        try {
            const sql = `SELECT id, nome, serie AS codigo, marca AS categoria, descricao, foto_url, eq_status AS status FROM equipamentos_ga ORDER BY id DESC`;
            const [rows] = await connection.query(sql);
            return rows;
        } finally { connection.release(); }
    }

    static async listarTudoEmUsoAdmin() {
        const connection = await getConnection();
        try {
            const sql = `
                SELECT emp.id, eq.nome AS equipamentoNome, u.nome AS usuario, emp.local_uso AS local, emp.data_criacao AS dataInicio
                FROM equipamento_emp_ga emp
                JOIN equipamentos_ga eq ON emp.equipamento_id = eq.id
                JOIN gl_ga u ON emp.gl_id = u.id
                WHERE emp.status = 'Aprovado' AND emp.data_devolucao IS NULL
            `;
            const [rows] = await connection.query(sql);
            return rows;
        } finally { connection.release(); }
    }

    static async listarSolicitacoesPendentes() {
        const connection = await getConnection();
        try {
            const sql = `
                SELECT emp.id, eq.nome AS equipamentoNome, u.nome AS usuario, emp.local_uso AS local, emp.data_criacao AS data, emp.status
                FROM equipamento_emp_ga emp
                JOIN equipamentos_ga eq ON emp.equipamento_id = eq.id
                JOIN gl_ga u ON emp.gl_id = u.id
                WHERE emp.status = 'Pendente'
            `;
            const [rows] = await connection.query(sql);
            return rows;
        } finally { connection.release(); }
    }


    static async atualizarStatusSolicitacao(id, novoStatus) {
        const connection = await getConnection();
        try {
            await connection.beginTransaction();

            const [solicitacao] = await connection.query(
                `SELECT equipamento_id FROM equipamento_emp_ga WHERE id = ?`,
                [id]
            );

            if (solicitacao.length === 0) {
                throw new Error("Solicitação não encontrada.");
            }

            const equipamentoId = solicitacao[0].equipamento_id;

            if (novoStatus === 'Aprovado') {
                const [equipamento] = await connection.query(
                    `SELECT eq_status FROM equipamentos_ga WHERE id = ?`,
                    [equipamentoId]
                );

                if (equipamento.length > 0 && equipamento[0].eq_status === 'Em uso') {
                    throw new Error("BLOQUEIO: Este equipamento já está em uso por outra pessoa.");
                }
            }

            await connection.query(
                `UPDATE equipamento_emp_ga SET status = ? WHERE id = ?`,
                [novoStatus, id]
            );

            if (novoStatus === 'Aprovado') {
                await connection.query(
                    `UPDATE equipamentos_ga SET eq_status = 'Em uso' WHERE id = ?`,
                    [equipamentoId]
                );
            }

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async registrarDevolucao(id) {
        const connection = await getConnection();
        try {
            await connection.beginTransaction();

            await connection.query(`UPDATE equipamento_emp_ga SET status = 'Devolvido', data_devolucao = NOW() WHERE id = ?`, [id]);

            const [rows] = await connection.query(`SELECT equipamento_id FROM equipamento_emp_ga WHERE id = ?`, [id]);
            if (rows.length > 0) {
                await connection.query(`UPDATE equipamentos_ga SET eq_status = 'Disponível' WHERE id = ?`, [rows[0].equipamento_id]);
            }

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally { connection.release(); }
    }
}

export default DashboardModel;