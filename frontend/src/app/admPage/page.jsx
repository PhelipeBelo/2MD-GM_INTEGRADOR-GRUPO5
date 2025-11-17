"use client";

import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pagAdmin.css";
import {
  FaTools,
  FaClipboardList,
  FaBoxes,
  FaEdit,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

// -----------------------------------------------------------------
// 1. COMPONENTE DO FORMULÁRIO (MODIFICADO)
// -----------------------------------------------------------------
function FormEquipamento({ onSave, onCancel, initialData }) {
  // Estado interno para os campos do formulário
  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    categoria: "",
    codigo: "",
    local: "",
    status: "Disponível", // NOVO CAMPO
  });

  // Este useEffect "popula" o formulário quando abrimos para edição
  useEffect(() => {
    if (initialData) {
      // Modo Edição: Carrega os dados do item
      setFormData(initialData);
    } else {
      // Modo Novo: Reseta o formulário
      setFormData({
        id: null,
        nome: "",
        categoria: "",
        codigo: "",
        local: "",
        status: "Disponível", // Garante o padrão "Disponível"
      });
    }
  }, [initialData]); // Executa sempre que o modal abre (initialData muda)

  // Atualiza o estado quando o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Chama a função onSave (que é a salvarEquipamento)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    // O formulário agora inclui o 'body' e o 'footer' do modal
    <form onSubmit={handleSubmit} noValidate>
      <div className="pagmodal-body">
        {/* Campo Nome */}
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome do Equipamento
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo Categoria */}
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">
            Categoria
          </label>
          <input
            type="text"
            className="form-control"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          {/* Campo Código */}
          <div className="col-md-6 mb-3">
            <label htmlFor="codigo" className="form-label">
              Código
            </label>
            <input
              type="text"
              className="form-control"
              id="codigo"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo Local */}
          <div className="col-md-6 mb-3">
            <label htmlFor="local" className="form-label">
              Local de Armazenamento
            </label>
            <input
              type="text"
              className="form-control"
              id="local"
              name="local"
              value={formData.local}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ===== NOVO CAMPO STATUS ===== */}
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            // Impede que o usuário defina "Em Uso" manualmente pelo formulário
            disabled={formData.status === "Em Uso"}
          >
            <option value="Disponível">Disponível</option>
            {/* Se o item já estiver "Em Uso", mostre a opção, mas desabilitada */}
            {formData.status === "Em Uso" && (
              <option value="Em Uso" disabled>
                Em Uso (Controlado por Solicitações)
              </option>
            )}
          </select>
        </div>
      </div>

      <div className="pagmodal-footer">
        <button
          type="button" // type="button" para não submeter o form
          className="btn btn-outline-secondary"
          onClick={onCancel} // Chama a função fecharModal
        >
          Cancelar
        </button>
        <button
          type="submit" // type="submit" para acionar o handleSubmit
          className="btn btn-primary-solid"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}

// -----------------------------------------------------------------
// 3. SEU COMPONENTE PRINCIPAL (MODIFICADO)
// -----------------------------------------------------------------
export default function PagAdmin() {
  const [abaAtiva, setAbaAtiva] = useState("equipamentos");
  const [equipamentos, setEquipamentos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [emUso, setEmUso] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [toast, setToast] = useState(null);

  // --- NOVOS ESTADOS E REF PARA O DROPDOWN ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // --- EFEITO PARA FECHAR O MENU AO CLICAR FORA ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    // Adiciona o listener
    document.addEventListener("mousedown", handleClickOutside);
    // Limpa o listener ao desmontar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  // Simula backend (useEffect inicial)
  useEffect(() => {
    // --- DADOS SIMULADOS ATUALIZADOS ---
    setEquipamentos([
      {
        id: 1,
        nome: "Parafusadeira MAKITA DFT08",
        categoria: "Elétrica",
        codigo: "FUR-001",
        local: "Prateleira A3",
        status: "Disponível", // Status adicionado
      },
      {
        id: 2,
        nome: "Serra Tico-Tico Industrial",
        categoria: "Elétrica",
        codigo: "CHV-002",
        local: "Gaveta B1",
        status: "Disponível", // Status adicionado
      },
      {
        id: 3,
        nome: "Esmerilhadeira BOSCH GWS 115",
        categoria: "Elétrica",
        codigo: "ESM-003",
        local: "Setor B",
        status: "Em Uso", // Status adicionado
      },
      {
        id: 4,
        nome: "Furadeira DeWalt 20V",
        categoria: "Elétrica",
        codigo: "FUR-004",
        local: "Prateleira C1",
        status: "Disponível", // Status adicionado
      },
      {
        id: 5,
        nome: "Serra Circular Makita",
        categoria: "Elétrica",
        codigo: "SER-005",
        local: "Prateleira C2",
        status: "Disponível", // Status adicionado
      },
    ]);

    setSolicitacoes([
      {
        id: 1,
        equipamentoId: 4, // ID Referenciado
        equipamentoNome: "Furadeira DeWalt 20V",
        usuario: "João Silva",
        local: "Setor A",
        data: "2025-11-12 09:30",
        status: "Pendente",
      },
      {
        id: 2,
        equipamentoId: 5, // ID Referenciado
        equipamentoNome: "Serra Circular Makita",
        usuario: "Maria Santos",
        local: "Linha 3",
        data: "2025-11-12 10:10",
        status: "Pendente",
      },
    ]);

    setEmUso([
      {
        id: 1, // ID do Empréstimo
        equipamentoId: 3, // ID Referenciado
        equipamentoNome: "Esmerilhadeira BOSCH GWS 115",
        usuario: "Carlos Lima",
        local: "Setor B",
        dataInicio: "2025-11-10",
      },
    ]);
  }, []);

  const abrirModal = (tipo, item = null) => {
    setModalData({ tipo, item });
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  // Esta função agora recebe os dados DIRETO do formulário (incluindo status)
  const salvarEquipamento = (equip) => {
    if (equip.id) {
      // Lógica de EDIÇÃO
      setEquipamentos((prev) =>
        prev.map((e) => (e.id === equip.id ? equip : e))
      );
      setToast({
        type: "success",
        message: "✅ Equipamento atualizado com sucesso!",
      });
    } else {
      // Lógica de CRIAÇÃO
      setEquipamentos((prev) => [
        ...prev,
        { ...equip, id: Date.now() }, // Cria um novo ID
      ]);
      setToast({
        type: "success",
        message: "✅ Novo equipamento cadastrado!",
      });
    }
    fecharModal();
  };

  const excluirEquipamento = (id) => {
    setEquipamentos((prev) => prev.filter((e) => e.id !== id));
    setToast({
      type: "danger",
      message: "❌ Equipamento excluído.",
    });
  };

  // --- LÓGICA DE APROVAÇÃO ATUALIZADA ---
  const aprovarSolicitacao = (id) => {
    const solicitacao = solicitacoes.find((s) => s.id === id);
    if (!solicitacao) return;

    // 1. Atualiza o status na lista principal de equipamentos
    setEquipamentos((prev) =>
      prev.map((eq) =>
        eq.id === solicitacao.equipamentoId
          ? { ...eq, status: "Em Uso" } // Define o status como "Em Uso"
          : eq
      )
    );

    // 2. Cria o novo registro de "Em Uso"
    const novoUso = {
      id: Date.now(), // ID do empréstimo
      equipamentoId: solicitacao.equipamentoId,
      equipamentoNome: solicitacao.equipamentoNome,
      usuario: solicitacao.usuario,
      local: solicitacao.local,
      dataInicio: new Date().toISOString().split("T")[0],
    };

    // 3. Adiciona a "Em Uso" e remove de "Solicitações"
    setEmUso((prev) => [...prev, novoUso]);
    setSolicitacoes((prev) => prev.filter((s) => s.id !== id));

    // 4. Toast
    setToast({
      type: "success",
      message: `✅ Solicitação aprovada! Equipamento "${solicitacao.equipamentoNome}" movido para Em uso.`,
    });
  };

  const recusarSolicitacao = (id) => {
    setSolicitacoes((prev) => prev.filter((s) => s.id !== id));
    setToast({
      type: "danger",
      message: "❌ Solicitação recusada com sucesso.",
    });
  };

  // --- NOVA FUNÇÃO PARA DEVOLVER EQUIPAMENTO ---
  const devolverEquipamento = (loanId) => {
    // 1. Encontra o item em uso (empréstimo)
    const itemEmUso = emUso.find((e) => e.id === loanId);
    if (!itemEmUso) return;

    // 2. Atualiza o status na lista principal de equipamentos
    setEquipamentos((prev) =>
      prev.map((eq) =>
        eq.id === itemEmUso.equipamentoId
          ? { ...eq, status: "Disponível" } // Define o status como "Disponível"
          : eq
      )
    );

    // 3. Remove o item da lista "Em Uso"
    setEmUso((prev) => prev.filter((e) => e.id !== loanId));

    // 4. Toast
    setToast({
      type: "success",
      message: `✅ Equipamento "${itemEmUso.equipamentoNome}" devolvido com sucesso!`,
    });
  };

  const fecharToast = () => setToast(null);

  // A tag <main> foi movida para fora e o py-4 removido
  return (
    <>
      <header
        className="border-bottom shadow-sm position-sticky top-0 z-3"
        style={{
          // --- GRADIENTE DO HEADER ATUALIZADO ---
          background:
            "linear-gradient(135deg, rgba(3,102,204,0.95), rgba(0,176,255,0.85))",
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
                animation: "pulse 2s infinite", // A animação agora vem do CSS
              }}
            >
              {/* Ícone substituído por um do react-icons */}
              <FaTools size={24} className="text-white" />
            </div>

            <div>
              <h1 className="h5 fw-bold mb-1">Equipamentos - GA</h1>
              <p className="small text-light opacity-75 mb-0">
                Painel de Administração
              </p>
            </div>
          </div>

          {/* --- DROPDOWN AGORA TEM A REF --- */}
          <div className="dropdown text-center position-relative" ref={menuRef}>
            <button
              className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2 rounded-pill px-3 py-2 user-menu-button"
              id="userMenu"
              aria-expanded={isMenuOpen} // Controlado pelo React
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Abre/fecha o menu
            >
              <img
                src="https://ui-avatars.com/api/?name=ADM&background=0d6efd&color=fff"
                alt="Avatar"
                className="rounded-circle border border-light"
                width="32"
                height="32"
              />
              <span className="fw-semibold">Administrador</span>
              {/* Ícone substituído */}
              <FaChevronDown />
            </button>

            {/* --- MENU DROPDOWN AGORA CONTROLADO PELO REACT --- */}
            <ul
              className={`dropdown-menu shadow-sm border-0 p-2 start-50 translate-middle-x margem_menu ${isMenuOpen ? "show" : "" // Adiciona a classe 'show' se isMenuOpen for true
                }`}
              aria-labelledby="userMenu"
            >
              <li>
                <h6 className="dropdown-header text-muted">Perfil</h6>
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center gap-2"
                // onClick removido para evitar erro de 'router'
                >
                  <FaUserCircle /> Meu Perfil
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center gap-2 mt-1"
                // onClick removido
                >
                  <FaCog /> Configurações
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger d-flex align-items-center gap-2"
                // onClick removido
                >
                  <FaSignOutAlt /> Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* A tag <main> agora começa AQUI, sem py-4 */}
      <main className="pagadmin-container container-fluid">
        {/* Toast de confirmação */}
        {toast && (
          <div className="toast-container position-fixed top-0 end-0 p-3">
            <div
              className={`toast show align-items-center text-bg-${toast.type === "success" ? "success" : "danger"
                } border-0`}
              role="alert"
            >
              <div className="d-flex">
                <div className="toast-body">{toast.message}</div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  onClick={fecharToast}
                ></button>
              </div>
            </div>
          </div>
        )}

        {/* Painel superior */}
        <div className="row mb-4 gx-3">
          <div className="col-lg-8">
            <div className="overview-panel p-3 d-flex align-items-center gap-3">
              <div className="brand-badge">
                <FaTools size={28} />
              </div>
              <div className="flex-grow-1">
                <h3 className="mb-0">Painel de Controle — Equipamentos GA</h3>
                <p className="mb-0 small text-muted">
                  Gerencie equipamentos, solicitações e ferramentas em uso.
                </p>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary-solid"
                  onClick={() => abrirModal("novoEquip")} // Abre o modal em modo "novo"
                >
                  <FaBoxes className="me-1" /> Novo Equipamento
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="stats-panel p-3">
              {/* Agora com 3 itens, o 'justify-content-between' 
                vai distribuir eles igualmente (um na esquerda, um no centro, um na direita)
              */}
              <div className="d-flex justify-content-between align-items-center">

                {/* Item 1: Equipamentos */}
                <div className="text-center"> {/* Alinhado ao centro */}
                  <small className="text-muted">Equipamentos</small>
                  <h4 className="mb-0">{equipamentos.length}</h4>
                </div>

                {/* Item 2: Em Uso (NOVO) */}
                <div className="text-center">
                  <small className="text-muted">Em Uso</small>
                  {/* Puxa a contagem da lista 'emUso' */}
                  <h4 className="mb-0">{emUso.length}</h4>
                </div>

                {/* Item 3: Solicitações */}
                <div className="text-center"> {/* Alinhado ao centro */}
                  <small className="text-muted">Solicitações</small>
                  <h4 className="mb-0">{solicitacoes.length}</h4>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* NAV ABAS */}
        <nav className="nav-dashboard mb-3">
          <button
            className={`tab ${abaAtiva === "equipamentos" ? "active" : ""}`}
            onClick={() => setAbaAtiva("equipamentos")}
          >
            <FaTools className="me-2" /> Equipamentos
          </button>
          <button
            className={`tab ${abaAtiva === "solicitacoes" ? "active" : ""}`}
            onClick={() => setAbaAtiva("solicitacoes")}
          >
            <FaClipboardList className="me-2" /> Solicitações
          </button>
          <button
            className={`tab ${abaAtiva === "emuso" ? "active" : ""}`}
            onClick={() => setAbaAtiva("emuso")}
          >
            <FaBoxes className="me-2" /> Em Uso
          </button>
        </nav>

        {/* ABAS DE CONTEÚDO */}
        <div className="row">
          {/* EQUIPAMENTOS */}
          {abaAtiva === "equipamentos" && (
            <div className="col-12">
              <div className="row g-4">
                {equipamentos.map((eq) => (
                  <div className="col-md-6 col-lg-4" key={eq.id}>
                    <article className="card-card h-100">
                      <div
                        className="card-top"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(3,102,204,0.95), rgba(0,176,255,0.85))",
                        }}
                      >
                        <div className="card-icon">
                          <FaBoxes size={28} />
                        </div>
                        <div className="card-quick">
                          <small className="text-light d-block mt-1">
                            {eq.categoria} · {eq.codigo}
                          </small>
                        </div>
                      </div>

                      <div className="card-body p-3">
                        <h5 className="card-title mb-1">{eq.nome}</h5>

                        {/* ===== NOVO BADGE DE STATUS ===== */}
                        <span
                          className={`badge ${eq.status === "Disponível"
                            ? "bg-success"
                            : eq.status === "Em Uso"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                            }`}
                        >
                          {eq.status}
                        </span>

                        <p className="text-muted small mb-2 mt-2">
                          <FaInfoCircle className="me-1" /> Local:{" "}
                          <strong>{eq.local}</strong>
                        </p>

                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div className="actions">
                            <button
                              className="btn btn-sm btn-outline"
                              title="Editar"
                              onClick={() => abrirModal("editarEquip", eq)} // Abre o modal em modo "editar"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() => excluirEquipamento(eq.id)}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SOLICITAÇÕES */}
          {abaAtiva === "solicitacoes" && (
            <div className="col-12">
              <div className="row g-4">
                {solicitacoes.map((s) => (
                  <div className="col-md-6" key={s.id}>
                    <div className="request-card p-3">
                      <div className="d-flex justify-content-between">
                        <div>
                          {/* Usa equipamentoNome */}
                          <h6 className="mb-1">{s.equipamentoNome}</h6>
                          <small className="text-muted">
                            Solicitante: {s.usuario} · {s.local}
                          </small>
                        </div>
                        <div className="text-end">
                          <span className="badge bg-warning text-dark">
                            {s.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 d-flex gap-2">
                        <button
                          className="btn btn-success"
                          onClick={() => aprovarSolicitacao(s.id)}
                        >
                          <FaCheck /> Aprovar
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => recusarSolicitacao(s.id)}
                        >
                          <FaTimes /> Recusar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EM USO */}
          {abaAtiva === "emuso" && (
            <div className="col-12">
              <div className="row g-4">
                {emUso.map((e) => (
                  <div className="col-md-6 col-lg-4" key={e.id}>
                    {/* Classes de flex para alinhar o botão no final */}
                    <div className="request-card p-3 h-100 d-flex flex-column justify-content-between">
                      <div>
                        {/* Usa equipamentoNome */}
                        <h6 className="mb-1">{e.equipamentoNome}</h6>
                        <p className="text-muted small mb-2">
                          <FaInfoCircle className="me-1" /> Responsável:{" "}
                          <strong>{e.usuario}</strong>
                        </p>
                        <p className="text-muted small mb-0">
                          Local: <strong>{e.local}</strong>
                        </p>
                        <p className="text-muted small">
                          Desde: <strong>{e.dataInicio}</strong>
                        </p>
                      </div>

                      {/* ===== NOVO BOTÃO DE DEVOLVER ===== */}
                      <div>
                        <button
                          className="btn btn-outline-secondary w-100 mt-3"
                          onClick={() => devolverEquipamento(e.id)}
                        >
                          Devolver Equipamento
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MODAL MODIFICADO */}
        {modalOpen && (
          <div className="pagmodal-backdrop" onClick={fecharModal}>
            <div className="pagmodal" onClick={(e) => e.stopPropagation()}>
              <div className="pagmodal-header">
                <h5 className="mb-0">
                  {modalData?.tipo === "editarEquip"
                    ? "Editar Equipamento"
                    : "Novo Equipamento"}
                </h5>
                <button
                  className="btn-close"
                  onClick={fecharModal}
                ></button>
              </div>

              {/* O formulário é renderizado aqui */}
              {/* Ele recebe as funções e os dados iniciais */}
              <FormEquipamento
                onSave={salvarEquipamento}
                onCancel={fecharModal}
                initialData={modalData?.item}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}