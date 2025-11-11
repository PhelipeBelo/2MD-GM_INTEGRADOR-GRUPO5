"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import './pagAdmin.css';

// --- DADOS ESTÁTICOS ---
const mockEquipamentos = [
  { id: 1, nome: "Parafusadeira DFT08MFMMS MAKITA", categoria: "Elétrica", codigo: "FUR-001", localizacao: "Prateleira A3", status: "disponivel" },
  { id: 2, nome: "Serra tico tico industrial 110 volts", categoria: "Manual", codigo: "CHV-002", localizacao: "Gaveta B1", status: "disponivel" },
  { id: 3, nome: "Esmerilhadeira 114 3MM GWS 6-115 BOSCH", categoria: "Manual", codigo: "ALC-003", localizacao: "Gaveta B2", status: "em_uso" },
  { id: 4, nome: "Furadeira de impacto com maleta Bosch", categoria: "Elétrica", codigo: "SER-004", localizacao: "Prateleira C1", status: "disponivel" },
];

const mockSolicitacoes = [
  { id: 1, equipamento: "Serra Circular Makita", usuario: "João Silva", email: "joao.silva@ga.com", data: "2025-11-06 14:30", status: "pendente" },
  { id: 2, equipamento: "Furadeira DeWalt 20V", usuario: "Maria Santos", email: "maria.santos@ga.com", data: "2025-11-06 15:45", status: "pendente" },
];

const mockLocalizacao = [
  { id: 1, equipamento: "Alicate Universal 8\"", codigo: "ALC-003", usuario: "Pedro Costa", email: "pedro.costa@ga.com", dataRetirada: "2025-11-03", previsaoDevolucao: "2025-11-10" },
  { id: 2, equipamento: "Chave Inglesa 12\"", codigo: "CHV-005", usuario: "Ana Lima", email: "ana.lima@ga.com", dataRetirada: "2025-11-05", previsaoDevolucao: "2025-11-12" },
];

// --- O COMPONENTE DA PÁGINA ---
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [abaAtiva, setAbaAtiva] = useState('equipamentos');

  // --- LÓGICA DO MODAL ---
  // null = modal fechado. 'adicionar' = modal de add. 'editar' = modal de edit.
  const [modalStatus, setModalStatus] = useState(null);
  // Guarda o item que está sendo editado (ex: {id: 1, nome: "Furadeira... "})
  const [itemEmEdicao, setItemEmEdicao] = useState(null);

  // Função para ABRIR o modal de ADICIONAR
  const handleAbrirModalAdicionar = () => {
    setItemEmEdicao(null); // Limpa o formulário
    setModalStatus('adicionar'); // Abre o modal no modo "adicionar"
  };

  // Função para ABRIR o modal de EDITAR
  const handleAbrirModalEditar = (item) => {
    setItemEmEdicao(item); // Preenche o formulário com o item
    setModalStatus('editar'); // Abre o modal no modo "editar"
  };

  // Função para FECHAR o modal
  const handleFecharModal = () => {
    setModalStatus(null);
    setItemEmEdicao(null); // Limpa tudo por segurança
  };

  // Função "fake" de salvar (só fecha o modal)
  const handleSalvar = (e) => {
    e.preventDefault(); // Impede o reload da página
    console.log("Dados salvos (mock):", itemEmEdicao);
    handleFecharModal();
  };

  // --- FIM DA LÓGICA DO MODAL ---


  return (
    <div className="pagina-admin-container">

      {/* 1. CABEÇALHO */}
      <header
        className="border-bottom shadow-sm position-sticky top-0 z-3"
        style={{
          background:
            "linear-gradient(135deg, #0d6efd 0%, #0b5ed7 40%, #084298 100%)",
          color: "white",
        }}
      >
        <div className="container-fluid px-4 py-3 d-flex justify-content-between align-items-center">
          {/* ===== LOGO + TÍTULO ===== */}
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(255,255,255,0.15)",
                boxShadow: "0 0 10px rgba(255,255,255,0.2)",
                animation: "pulse 2s infinite",
              }}
            >
              <i className="bi bi-gear-wide-connected fs-4 text-white"></i>
            </div>

            <div>
              <h1 className="h5 fw-bold mb-1">Equipamentos - GA</h1>
              <p className="small text-light opacity-75 mb-0">Painel de Administração</p>
            </div>
          </div>

          <div className="dropdown text-center position-relative">
            <button
              className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2 rounded-pill px-3 py-2"
              id="userMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(255,255,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <img
                src="https://ui-avatars.com/api/?name=GL&background=0d6efd&color=fff"
                alt="Avatar"
                className="rounded-circle border border-light"
                width="32"
                height="32"
              />
              <span className="fw-semibold">Administrador</span>
              <i className="bi bi-chevron-down"></i>
            </button>

            {/* ===== MENU DROPDOWN ===== */}
            <ul
              className="dropdown-menu margem_menu shadow-sm border-0 p-2 start-50 translate-middle-x"
              aria-labelledby="userMenu"
            >
              <li>
                <h6 className="dropdown-header text-muted">Perfil</h6>
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center gap-2"
                  onClick={() => router.push("/perfil")}
                >
                  <i className="bi bi-person-circle"></i> Meu Perfil
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center gap-2 mt-1"
                  onClick={() => router.push("/configuracoes")}
                >
                  <i className="bi bi-gear"></i> Configurações
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger d-flex align-items-center gap-2"
                  onClick={() => router.push("/login")}
                >
                  <i className="bi bi-box-arrow-right"></i> Sair
                </button>
              </li>
            </ul>
          </div>
          </div>

          {/* ===== ANIMAÇÃO CSS ===== */}
          <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>
      </header>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <main className="admin-main">

        {/* ABAS DE NAVEGAÇÃO */}
        <nav className="admin-nav">
          <button
            className={abaAtiva === 'equipamentos' ? 'ativo' : ''}
            onClick={() => setAbaAtiva('equipamentos')}
          >
            Equipamentos
          </button>
          <button
            className={abaAtiva === 'solicitacoes' ? 'ativo' : ''}
            onClick={() => setAbaAtiva('solicitacoes')}
          >
            Solicitações
          </button>
          <button
            className={abaAtiva === 'localizacao' ? 'ativo' : ''}
            onClick={() => setAbaAtiva('localizacao')}
          >
            Localização
          </button>
        </nav>

        {/* CONTEÚDO DAS ABAS */}

        {/* ABA 1: EQUIPAMENTOS */}
        {abaAtiva === 'equipamentos' && (
          <section id="equipamentos" className="admin-content-card">
            <div className="admin-content-header">
              <div>
                <h2>Controle de Equipamentos</h2>
                <p>Gerencie o catálogo de ferramentas</p>
              </div>
              {/* Botão "Adicionar" agora chama o modal */}
              <button
                className="add-summary-button"
                onClick={handleAbrirModalAdicionar}
              >
                Adicionar Novo
              </button>
            </div>

            {/* O <details> e <form> foram REMOVIDOS daqui */}

            <div className="item-list">
              {mockEquipamentos.map((eq) => (
                <div key={eq.id} className="item-card">
                  <div className="item-info">
                    <h3>{eq.nome}</h3>
                    <p>{eq.categoria} • {eq.codigo}</p>
                    <span className="item-location">{eq.localizacao}</span>
                  </div>
                  <div className="item-actions">
                    <span className={`status ${eq.status === 'disponivel' ? 'status-disponivel' : 'status-em-uso'}`}>
                      {eq.status === 'disponivel' ? 'Disponível' : 'Em uso'}
                    </span>
                    {/* Botão "Editar" agora chama o modal com o item "eq" */}
                    <button
                      className="btn-secundario"
                      onClick={() => handleAbrirModalEditar(eq)}
                    >
                      Editar
                    </button>
                    <button className="btn-destrutivo">Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ABA 2: SOLICITAÇÕES */}
        {abaAtiva === 'solicitacoes' && (
          <section id="solicitacoes" className="admin-content-card">
            <div className="admin-content-header">
              <h2>Solicitações Pendentes</h2>
            </div>
            <div className="item-list">
              {mockSolicitacoes.map((sol) => (
                <div key={sol.id} className="item-card">
                  {/* ... (conteúdo da aba 2) ... */}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ABA 3: LOCALIZAÇÃO */}
        {abaAtiva === 'localizacao' && (
          <section id="localizacao" className="admin-content-card">
            <div className="admin-content-header">
              <h2>Equipamentos em Uso</h2>
            </div>
            <div className="item-list">
              {mockLocalizacao.map((loc) => (
                <div key={loc.id} className="item-card">
                  {/* ... (conteúdo da aba 3) ... */}
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* O MODAL DE ADICIONAR / EDITAR */}
      {modalStatus && (
        <div className="modal-backdrop">
          <div className="modal-content">

            {/* Cabeçalho do Modal */}
            <div className="modal-header">
              <h3>
                {/* O título muda dependendo do modo */}
                {modalStatus === 'editar' ? 'Editar Equipamento' : 'Adicionar Novo Equipamento'}
              </h3>
              <button className="modal-close-button" onClick={handleFecharModal}>
                &times; {/* Isso é um "X" */}
              </button>
            </div>

            {/* Corpo do Modal (O Formulário) */}
            <form className="modal-form" onSubmit={handleSalvar}>
              <div className="form-grid">
                <div>
                  <label htmlFor="nome">Nome do Equipamento</label>
                  <input
                    id="nome"
                    type="text"
                    defaultValue={itemEmEdicao?.nome} // Preenche se estiver editando
                  />
                </div>
                <div>
                  <label htmlFor="categoria">Categoria</label>
                  <input
                    id="categoria"
                    type="text"
                    defaultValue={itemEmEdicao?.categoria}
                  />
                </div>
                <div>
                  <label htmlFor="codigo">Código</label>
                  <input
                    id="codigo"
                    type="text"
                    defaultValue={itemEmEdicao?.codigo}
                  />
                </div>
                <div>
                  <label htmlFor="localizacao">Localização</label>
                  <input
                    id="localizacao"
                    type="text"
                    defaultValue={itemEmEdicao?.localizacao}
                  />
                </div>
              </div>

              {/* Rodapé do Modal (Botões) */}
              <div className="modal-footer">
                <button type="button" className="btn-secundario" onClick={handleFecharModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primario-solid">
                  {modalStatus === 'editar' ? 'Salvar Alterações' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* FIM DO MODAL */}

    </div>
  );
};