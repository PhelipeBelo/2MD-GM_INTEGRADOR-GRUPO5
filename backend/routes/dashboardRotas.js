import express from 'express';
import DashboardController from '../controllers/DashboardController.js';

const router = express.Router();

// Rotas do Usuário
router.get('/gl/dashboard', DashboardController.getDadosUsuario);
router.post('/gl/dashboard', DashboardController.criarSolicitacao);

// Rotas do Admin
router.get('/admin/dashboard', DashboardController.getDadosAdmin);
// Rotas de Ação (Aprovar/Recusar/Devolver)
router.post('/gl/solicitacoes/:id/:acao', DashboardController.responderSolicitacao); // :acao = 'aprovar' ou 'recusar'
router.post('/gl/devolucao/:id', DashboardController.registrarDevolucao);

export default router;