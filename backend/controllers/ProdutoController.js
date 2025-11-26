import ProdutoModel from '../models/ProdutoModel.js';

class ProdutoController {

    // POST /produtos (Criar)
    static async criar(req, res) {
        try {
            // Recebe os dados com os nomes que o Frontend (PagAdmin) envia
            const { nome, marca, serie, status, descricao, foto_url } = req.body;

            // Validação: Verifica se os campos obrigatórios da tabela estão presentes
            if (!nome || !marca || !serie || !descricao || !foto_url) {
                return res.status(400).json({
                    mensagem: "Preencha todos os campos obrigatórios (Nome, Marca/Categoria, Série/Código)."
                });
            }

            await ProdutoModel.criar({ nome, marca, serie, status, descricao, foto_url });

            return res.status(201).json({ mensagem: "Equipamento criado com sucesso!" });

        } catch (error) {
            console.error('Erro ao criar equipamento:', error);
            // Tratamento de erro para código duplicado
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ mensagem: "Já existe um equipamento com este Código/Série." });
            }
            return res.status(500).json({ mensagem: "Erro interno ao salvar no banco." });
        }
    }

    // PUT /produtos/:id (Editar)
    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, marca, serie, status , descricao, foto_url } = req.body;

            await ProdutoModel.atualizar(id, { nome, marca, serie, status , descricao, foto_url});

            return res.status(200).json({ mensagem: "Equipamento atualizado!" });

        } catch (error) {
            console.error('Erro ao atualizar:', error);
            return res.status(500).json({ mensagem: "Erro ao atualizar equipamento." });
        }
    }

    // DELETE /produtos/:id (Excluir)
    static async excluir(req, res) {
        try {
            const { id } = req.params;
            await ProdutoModel.excluir(id);
            return res.status(200).json({ mensagem: "Equipamento excluído." });
        } catch (error) {
            // Tratamento de erro para chave estrangeira (item emprestado)
            if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(400).json({ mensagem: "Não é possível excluir: Este item tem histórico de uso." });
            }
            return res.status(500).json({ mensagem: "Erro ao excluir." });
        }
    }

    // LISTAR (Opcional, caso precise isoladamente)
    static async listarTodos(req, res) {
        const dados = await ProdutoModel.listarTodos();
        res.json(dados);
    }

    static async buscarPorId(req, res) {
        const item = await ProdutoModel.buscarPorId(req.params.id);
        res.json(item);
    }
}

export default ProdutoController;