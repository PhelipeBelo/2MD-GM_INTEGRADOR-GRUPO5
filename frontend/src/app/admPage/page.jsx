"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pagAdmin.css";
import { FaTools, FaClipboardList, FaBoxes, FaEdit, FaCheck, FaTimes, FaInfoCircle, FaCalendarAlt } from "react-icons/fa";

export default function PagAdmin() {
  const [abaAtiva, setAbaAtiva] = useState("equipamentos");
  const [equipamentos, setEquipamentos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [emUso, setEmUso] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [toast, setToast] = useState(null);

  // Simula backend (useEffect inicial)
  useEffect(() => {
    setEquipamentos([
      {
        id: 1,
        nome: "Parafusadeira MAKITA DFT08",
        categoria: "Elétrica",
        codigo: "FUR-001",
        local: "Prateleira A3",
      },
      {
        id: 2,
        nome: "Serra Tico-Tico Industrial",
        categoria: "Elétrica",
        codigo: "CHV-002",
        local: "Gaveta B1",
      },
    ]);

    setSolicitacoes([
      {
        id: 1,
        equipamento: "Furadeira DeWalt 20V",
        usuario: "João Silva",
        local: "Setor A",
        data: "2025-11-12 09:30",
        status: "Pendente",
      },
      {
        id: 2,
        equipamento: "Serra Circular Makita",
        usuario: "Maria Santos",
        local: "Linha 3",
        data: "2025-11-12 10:10",
        status: "Pendente",
      },
    ]);

    setEmUso([
      {
        id: 1,
        equipamento: "Esmerilhadeira BOSCH GWS 115",
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

  const salvarEquipamento = (equip) => {
    if (equip.id) {
      setEquipamentos((prev) =>
        prev.map((e) => (e.id === equip.id ? equip : e))
      );
    } else {
      setEquipamentos((prev) => [...prev, { ...equip, id: Date.now() }]);
    }
    fecharModal();
  };

  const excluirEquipamento = (id) => {
    setEquipamentos((prev) => prev.filter((e) => e.id !== id));
  };

  const aprovarSolicitacao = (id) => {
    const solicitacao = solicitacoes.find((s) => s.id === id);
    if (!solicitacao) return;

    const novoUso = {
      id: Date.now(),
      equipamento: solicitacao.equipamento,
      usuario: solicitacao.usuario,
      local: solicitacao.local,
      dataInicio: new Date().toISOString().split("T")[0],
    };

    setEmUso((prev) => [...prev, novoUso]);
    setSolicitacoes((prev) => prev.filter((s) => s.id !== id));

    setToast({
      type: "success",
      message: `✅ Solicitação aprovada! Equipamento "${solicitacao.equipamento}" movido para Em uso.`,
    });
  };

  const recusarSolicitacao = (id) => {
    setSolicitacoes((prev) => prev.filter((s) => s.id !== id));
    setToast({
      type: "danger",
      message: "❌ Solicitação recusada com sucesso.",
    });
  };

  const fecharToast = () => setToast(null);

  return (
    <main className="pagadmin-container container-fluid py-4">
      {/* Toast de confirmação */}
      {toast && (
        <div className="toast-container position-fixed top-0 end-0 p-3">
          <div
            className={`toast show align-items-center text-bg-${
              toast.type === "success" ? "success" : "danger"
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
                onClick={() => abrirModal("novoEquip")}
              >
                <FaBoxes className="me-1" /> Novo Equipamento
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="stats-panel p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Equipamentos</small>
                <h4 className="mb-0">{equipamentos.length}</h4>
              </div>
              <div className="text-end">
                <small className="text-muted">Solicitações</small>
                <h4 className="mb-0">{solicitacoes.length}</h4>
              </div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button className="chip chip-blue">
                <FaCalendarAlt /> Agenda
              </button>
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
                      <p className="text-muted small mb-2">
                        <FaInfoCircle className="me-1" /> Local:{" "}
                        <strong>{eq.local}</strong>
                      </p>

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="actions">
                          <button
                            className="btn btn-sm btn-outline-light"
                            title="Editar"
                            onClick={() => abrirModal("editarEquip", eq)}
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
                        <h6 className="mb-1">{s.equipamento}</h6>
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
                  <div className="request-card p-3">
                    <h6 className="mb-1">{e.equipamento}</h6>
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="pagmodal-backdrop" onClick={fecharModal}>
          <div className="pagmodal" onClick={(e) => e.stopPropagation()}>
            <div className="pagmodal-header">
              <h5 className="mb-0">
                {modalData?.tipo === "editarEquip"
                  ? "Editar Equipamento"
                  : "Novo Equipamento"}
              </h5>
              <button className="btn-close" onClick={fecharModal}></button>
            </div>
            <div className="pagmodal-body">
              <p className="text-muted small">
                Campos prontos para integração com backend.
              </p>
            </div>
            <div className="pagmodal-footer">
              <button
                className="btn btn-outline-secondary"
                onClick={fecharModal}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary-solid"
                onClick={() => salvarEquipamento(modalData.item || {})}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
