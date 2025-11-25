import express from 'express';
import ProdutoController from '../controllers/ProdutoController.js';

// Se você tiver middleware de autenticação, pode descomentar a linha abaixo:
// import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// --- ROTAS PÚBLICAS (ou adicione authMiddleware se precisar proteger) ---

// Listar todos e buscar por ID
router.get('/', ProdutoController.listarTodos);
router.get('/:id', ProdutoController.buscarPorId);

// --- ROTAS DE AÇÃO (Criar, Editar, Excluir) ---

// Criar novo equipamento (Removemos o uploadImagens por enquanto para focar no cadastro)
router.post('/', ProdutoController.criar);

// Atualizar equipamento
router.put('/:id', ProdutoController.atualizar);

// Excluir equipamento
router.delete('/:id', ProdutoController.excluir);

// --- ROTAS DE UPLOAD (Removidas temporariamente para evitar o erro) ---
// Se precisar de upload de imagem no futuro, reativamos aqui e no Controller.

export default router;