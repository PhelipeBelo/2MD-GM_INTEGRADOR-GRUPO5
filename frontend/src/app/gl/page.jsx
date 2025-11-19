"use client";

import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pagGl.css";
import {
  FaTools,
  FaClipboardList,
  FaBoxOpen,
  FaSearch,
  FaCheckCircle,
  FaHistory,
  FaInfoCircle,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaArrowRight
} from "react-icons/fa";

// -----------------------------------------------------------------
// 1. COMPONENTE MODAL DE SOLICITAÇÃO
// -----------------------------------------------------------------
function ModalSolicitacao({ item, onConfirm, onCancel }) {
  const [localUso, setLocalUso] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(item, localUso);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="pagmodal-body">
        <div className="alert alert-primary d-flex align-items-center" role="alert">
          <FaInfoCircle className="me-2" />
          <div>
            Você está solicitando: <strong>{item.nome}</strong>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="local" className="form-label fw-bold">
            Onde o equipamento será utilizado?
          </label>
          <input
            type="text"
            className="form-control"
            id="local"
            placeholder="Ex: Linha de Montagem 2, Setor B..."
            value={localUso}
            onChange={(e) => setLocalUso(e.target.value)}
            required
            autoFocus
          />
          <div className="form-text">Informe o local exato para agilizar a aprovação.</div>
        </div>
      </div>

      <div className="pagmodal-footer">
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary-solid">
          Confirmar Solicitação
        </button>
      </div>
    </form>
  );
}

// -----------------------------------------------------------------
// 2. COMPONENTE PRINCIPAL (USUÁRIO - PAG GL)
// -----------------------------------------------------------------
export default function PagGL() {
  const [abaAtiva, setAbaAtiva] = useState("catalogo");
  const [toast, setToast] = useState(null);

  const [disponiveis, setDisponiveis] = useState([]);
  const [meusEmprestimos, setMeusEmprestimos] = useState([]);
  const [minhasSolicitacoes, setMinhasSolicitacoes] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  useEffect(() => {
    setDisponiveis([
      { id: 1, nome: "Parafusadeira MAKITA DFT08", categoria: "Elétrica", codigo: "FUR-001", status: "Disponível" },
      { id: 2, nome: "Serra Tico-Tico Industrial", categoria: "Elétrica", codigo: "CHV-002", status: "Disponível" },
      { id: 4, nome: "Furadeira DeWalt 20V", categoria: "Elétrica", codigo: "FUR-004", status: "Disponível" },
    ]);

    setMeusEmprestimos([
      { id: 101, nome: "Multímetro Digital Fluke", codigo: "INS-055", dataRetirada: "15/11/2025", local: "Lab. Eletrônica" }
    ]);

    setMinhasSolicitacoes([
      { id: 201, item: "Martelete Rompedor", data: "18/11/2025", status: "Pendente" },
      { id: 202, item: "Esmerilhadeira Bosch", data: "10/11/2025", status: "Aprovado" },
      { id: 203, item: "Alicate Hidráulico", data: "05/11/2025", status: "Recusado" },
    ]);
  }, []);

  const abrirSolicitacao = (item) => {
    setItemSelecionado(item);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setItemSelecionado(null);
  };

  const confirmarSolicitacao = (item, local) => {
    const novaSolicitacao = {
      id: Date.now(),
      item: item.nome,
      data: new Date().toLocaleDateString(),
      status: "Pendente",
      local: local
    };

    setMinhasSolicitacoes([novaSolicitacao, ...minhasSolicitacoes]);
    setDisponiveis((prev) => prev.filter((i) => i.id !== item.id));

    setToast({ type: "success", message: `✅ Solicitação enviada para: ${item.nome}` });
    fecharModal();
  };

  const fecharToast = () => setToast(null);

  return (
    <>
      <header
        className="border-bottom shadow-sm position-sticky top-0 z-3"
        style={{
          background: "linear-gradient(135deg, rgba(3,102,204,0.95), rgba(0,176,255,0.85))",
          color: "white",
        }}
      >
        <div className="container-fluid px-3 px-md-4 py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2 gap-md-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(255,255,255,0.15)",
                boxShadow: "0 0 10px rgba(255,255,255,0.2)",
              }}
            >
              <FaBoxOpen size={24} className="text-white" />
            </div>
            <div>
              <h1 className="h5 fw-bold mb-1 text-nowrap">Portal do Colaborador</h1>
              <p className="small text-light opacity-75 mb-0 d-none d-md-block">
                Solicitação de Equipamentos
              </p>
            </div>
          </div>

          <div className="dropdown text-center position-relative" ref={menuRef}>
            <button
              className="btn btn-outline-light user-menu-button d-flex align-items-center justify-content-center gap-2 rounded-pill px-3 py-2"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img
                src="https://ui-avatars.com/api/?name=User+GL&background=28a745&color=fff"
                alt="Avatar"
                className="rounded-circle border border-light"
                width="32"
                height="32"
              />
              <span className="fw-semibold d-none d-md-block">João (GL)</span>
              <FaChevronDown />
            </button>

            <ul
              className={`dropdown-menu shadow-sm border-0 p-2 end-0 margem_menu ${isMenuOpen ? "show" : ""}`}
              style={{ minWidth: "200px", right: 0, left: "auto" }}
            >
              <li><h6 className="dropdown-header text-muted">Minha Conta</h6></li>
              <li><button className="dropdown-item gap-2 d-flex align-items-center"><FaUserCircle /> Meus Dados</button></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item text-danger gap-2 d-flex align-items-center"><FaSignOutAlt /> Sair</button></li>
            </ul>
          </div>
        </div>
      </header>

      <main className="pagadmin-container container-fluid">
        {toast && (
          <div className="toast-container position-fixed top-0 end-0 p-3">
            <div className={`toast show align-items-center text-bg-${toast.type === "success" ? "success" : "danger"} border-0`} role="alert">
              <div className="d-flex">
                <div className="toast-body">{toast.message}</div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={fecharToast}></button>
              </div>
            </div>
          </div>
        )}

        <div className="row mb-4 gx-3">
          <div className="col-12">
            <div className="overview-panel p-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="brand-badge bg-success" style={{ background: "linear-gradient(135deg, #28a745, #34ce57)" }}>
                  <FaUserCircle size={28} />
                </div>
                <div>
                  <h3 className="mb-0">Olá, João</h3>
                  <p className="mb-0 small text-muted">Selecione um item disponível para solicitar.</p>
                </div>
              </div>

              <div className="d-flex gap-4 text-center pe-md-4">
                <div>
                  <h4 className="mb-0 text-primary">{meusEmprestimos.length}</h4>
                  <small className="text-muted">Em posse</small>
                </div>
                <div className="border-start mx-1"></div>
                <div>
                  <h4 className="mb-0 text-warning">{minhasSolicitacoes.filter(s => s.status === "Pendente").length}</h4>
                  <small className="text-muted">Pendentes</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="nav-dashboard mb-3 overflow-auto flex-nowrap">
          <button className={`tab ${abaAtiva === "catalogo" ? "active" : ""}`} onClick={() => setAbaAtiva("catalogo")}>
            <FaSearch className="me-2" /> Catálogo Disponível
          </button>
          <button className={`tab ${abaAtiva === "meus" ? "active" : ""}`} onClick={() => setAbaAtiva("meus")}>
            <FaTools className="me-2" /> Em Minha Posse
          </button>
          <button className={`tab ${abaAtiva === "solicitacoes" ? "active" : ""}`} onClick={() => setAbaAtiva("solicitacoes")}>
            <FaClipboardList className="me-2" /> Minhas Solicitações
          </button>
        </nav>

        <div className="row">

          {/* ABA CATÁLOGO (Disponíveis) */}
          {abaAtiva === "catalogo" && (
            <div className="col-12">
              {disponiveis.length === 0 ? (
                <div className="text-center py-5 text-muted">Não há equipamentos disponíveis no momento.</div>
              ) : (
                <div className="row g-4">
                  {disponiveis.map((eq) => (
                    <div className="col-md-6 col-lg-4" key={eq.id}>
                      <article className="card-card h-100 d-flex flex-column">
                        <div className="card-top" style={{ background: "linear-gradient(135deg, rgba(3,102,204,0.95), rgba(0,176,255,0.85))" }}>
                           <div className="d-flex justify-content-between w-100 align-items-center"> {/* Adicionado align-items-center */}
                              <FaBoxOpen size={24} />
                              {/* Badge Verde e centralizado verticalmente */}
                              <span className="badge bg-success bg-opacity-75 text-white border border-light border-opacity-25 py-2 px-3 rounded-pill">Disponível</span>
                           </div>
                           <small className="text-light mt-2 opacity-75">{eq.codigo}</small>
                        </div>
                        <div className="card-body p-3 flex-grow-1 d-flex flex-column justify-content-between">
                          <div>
                            <h5 className="card-title mb-1">{eq.nome}</h5>
                            <p className="text-muted small mb-0">{eq.categoria}</p>
                          </div>
                          <button
                            className="btn btn-primary-solid w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                            onClick={() => abrirSolicitacao(eq)}
                          >
                            Solicitar <FaArrowRight size={12} />
                          </button>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ABA MEUS EMPRÉSTIMOS (Em Uso) */}
          {abaAtiva === "meus" && (
            <div className="col-12">
              {meusEmprestimos.length === 0 ? (
                <div className="text-center py-5 text-muted">Você não possui nenhum equipamento em uso.</div>
              ) : (
                <div className="row g-4">
                  {meusEmprestimos.map((eq) => (
                    <div className="col-md-6 col-lg-4" key={eq.id}>
                      <div className="request-card p-3 h-100 border-primary border-opacity-25" style={{background: "#f8fbff"}}>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                           <h6 className="mb-0 fw-bold text-primary">{eq.nome}</h6>
                           <span className="badge bg-primary">Em Uso</span>
                        </div>
                        <div className="small text-muted space-y-2">
                           <p className="mb-1"><FaInfoCircle className="me-1"/> Código: {eq.codigo}</p>
                           <p className="mb-1"><FaHistory className="me-1"/> Retirado em: {eq.dataRetirada}</p>
                           <p className="mb-0"><FaSearch className="me-1"/> Local: {eq.local}</p>
                        </div>
                        <div className="mt-3 pt-3 border-top text-center">
                           <small className="text-muted fst-italic">Para devolver, procure o almoxarifado.</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ABA SOLICITAÇÕES (Histórico) */}
          {abaAtiva === "solicitacoes" && (
            <div className="col-12">
              <div className="row g-3">
                {minhasSolicitacoes.map((sol) => (
                  <div className="col-12" key={sol.id}>
                    <div className="request-card p-3 d-flex align-items-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className={`rounded-circle p-2 d-flex align-items-center justify-content-center
                          ${sol.status === 'Aprovado' ? 'bg-success bg-opacity-10 text-success' :
                            sol.status === 'Recusado' ? 'bg-danger bg-opacity-10 text-danger' :
                            'bg-warning bg-opacity-10 text-warning'}`}
                          style={{width: 40, height: 40}}
                        >
                          {sol.status === 'Aprovado' ? <FaCheckCircle /> : sol.status === 'Recusado' ? <FaTools /> : <FaHistory />}
                        </div>
                        <div>
                          <h6 className="mb-0">{sol.item}</h6>
                          <small className="text-muted">Solicitado em: {sol.data}</small>
                        </div>
                      </div>
                      <div className="text-end">
                         <span className={`badge rounded-pill
                            ${sol.status === 'Aprovado' ? 'bg-success' :
                              sol.status === 'Recusado' ? 'bg-danger' :
                              'bg-warning text-dark'}`}>
                            {sol.status}
                         </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {modalOpen && itemSelecionado && (
          <div className="pagmodal-backdrop" onClick={fecharModal}>
            <div className="pagmodal" onClick={(e) => e.stopPropagation()}>
              <div className="pagmodal-header">
                <h5 className="mb-0 text-white">Nova Solicitação</h5>
                <button className="btn-close btn-close-white" onClick={fecharModal}></button>
              </div>
              <ModalSolicitacao
                item={itemSelecionado}
                onConfirm={confirmarSolicitacao}
                onCancel={fecharModal}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}