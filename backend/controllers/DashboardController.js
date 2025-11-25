import DashboardModel from '../models/DashboardModel.js';

class DashboardController {

    // --- USUÁRIO ---
    static async getDadosUsuario(req, res) {
        try {
            const userId = req.query.userId;
            if (!userId) return res.status(400).json({ erro: 'ID obrigatório' });

            const [disponiveis, meusEmprestimos, minhasSolicitacoes] = await Promise.all([
                DashboardModel.listarDisponiveis(),
                DashboardModel.listarMeusEmprestimos(userId),
                DashboardModel.listarMinhasSolicitacoes(userId)
            ]);

            return res.status(200).json({ disponiveis, meusEmprestimos, minhasSolicitacoes });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro no servidor' });
        }
    }

    static async criarSolicitacao(req, res) {
        try {
            const { equipamento_id, local_uso, usuario_id } = req.body;
            if (!equipamento_id || !usuario_id || !local_uso) return res.status(400).json({ erro: 'Dados incompletos' });

            await DashboardModel.criarSolicitacao({ equipamento_id, usuario_id, local_uso });
            return res.status(201).json({ mensagem: 'Solicitação criada!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao salvar' });
        }
    }

    // --- ADMIN ---
    static async getDadosAdmin(req, res) {
        try {
            const [todosEquipamentos, emUso, solicitacoes] = await Promise.all([
                DashboardModel.listarTodosEquipamentos(),
                DashboardModel.listarTudoEmUsoAdmin(),
                DashboardModel.listarSolicitacoesPendentes()
            ]);

            return res.status(200).json({ equipamentos: todosEquipamentos, emUso: emUso || [], solicitacoes: solicitacoes || [] });
        } catch (error) {
            console.error('Erro Admin:', error);
            return res.status(500).json({ erro: 'Erro interno admin' });
        }
    }

    static async responderSolicitacao(req, res) {
        try {
            const { id, acao } = req.params; // acao: 'aprovar' ou 'recusar'
            const status = acao === 'aprovar' ? 'Aprovado' : 'Recusado';
            
            await DashboardModel.atualizarStatusSolicitacao(id, status);
            return res.status(200).json({ mensagem: `Solicitação ${status}!` });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao processar' });
        }
    }

    static async registrarDevolucao(req, res) {
        try {
            const { id } = req.params;
            await DashboardModel.registrarDevolucao(id);
            return res.status(200).json({ mensagem: 'Devolução registrada!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao devolver' });
        }
    }
}

export default DashboardController;