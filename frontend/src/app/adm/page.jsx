"use client";

import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pagAdmin.css";
import { useRouter } from 'next/navigation'; // Importante para redirecionar
import {
  FaTools,
  FaClipboardList,
  FaBoxes,
  FaEdit,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import Link from "next/link";

// -----------------------------------------------------------------
// 1. COMPONENTE DO FORMULÁRIO (MANTIDO IGUAL)
// -----------------------------------------------------------------
function FormEquipamento({ onSave, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    categoria: "",
    codigo: "",
    local: "",
    status: "Disponível",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: null,
        nome: "",
        categoria: "",
        codigo: "",
        local: "",
        status: "Disponível",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="pagmodal-body">
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome do Equipamento</label>
          <input type="text" className="form-control" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoria</label>
          <input type="text" className="form-control" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="codigo" className="form-label">Código</label>
            <input type="text" className="form-control" id="codigo" name="codigo" value={formData.codigo} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="local" className="form-label">Local de Armazenamento</label>
            <input type="text" className="form-control" id="local" name="local" value={formData.local} onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select className="form-select" id="status" name="status" value={formData.status} onChange={handleChange} disabled={formData.status === "Em Uso"}>
            <option value="Disponível">Disponível</option>
            {formData.status === "Em Uso" && <option value="Em Uso" disabled>Em Uso (Controlado por Solicitações)</option>}
          </select>
        </div>
      </div>
      <div className="pagmodal-footer">
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary-solid">Salvar</button>
      </div>
    </form>
  );
}

// -----------------------------------------------------------------
// 3. SEU COMPONENTE PRINCIPAL (ATUALIZADO COM AUTH)
// -----------------------------------------------------------------
export default function PagAdmin() {
  const router = useRouter(); // Hook para navegação
  
  // --- 1. ESTADO DO USUÁRIO ---
  const [user, setUser] = useState(null); // Começa nulo até carregar do storage

  const [abaAtiva, setAbaAtiva] = useState("equipamentos");
  const [equipamentos, setEquipamentos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [emUso, setEmUso] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [toast, setToast] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuRef = useRef(null);

  // --- 2. EFEITO DE AUTENTICAÇÃO (O "porteiro" da página) ---
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');

    // Se não tiver login, manda embora pro login
    if (!token || !usuarioSalvo) {
      router.push('/');
      return;
    }

    const dadosBanco = JSON.parse(usuarioSalvo);

    // Carrega os dados reais do usuário
    setUser({
      nome: dadosBanco.nome,
      // Se não tiver foto no banco, gera uma com as iniciais
      foto: dadosBanco.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(dadosBanco.nome)}&background=0d6efd&color=fff`,
      isAdmin: true // Opcional: verificar se ele realmente é admin
    });

  }, [router]);

  // Fecha menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  // Carrega dados iniciais (Mockados por enquanto)
  useEffect(() => {
    if (!user) return; // Só carrega dados se o usuário estiver logado

    setEquipamentos([
      { id: 1, nome: "Parafusadeira MAKITA DFT08", categoria: "Elétrica", codigo: "FUR-001", local: "Prateleira A3", status: "Disponível" },
      { id: 2, nome: "Serra Tico-Tico Industrial", categoria: "Elétrica", codigo: "CHV-002", local: "Gaveta B1", status: "Disponível" },
      { id: 3, nome: "Esmerilhadeira BOSCH GWS 115", categoria: "Elétrica", codigo: "ESM-003", local: "Setor B", status: "Em Uso" },
      { id: 4, nome: "Furadeira DeWalt 20V", categoria: "Elétrica", codigo: "FUR-004", local: "Prateleira C1", status: "Disponível" },
      { id: 5, nome: "Serra Circular Makita", categoria: "Elétrica", codigo: "SER-005", local: "Prateleira C2", status: "Disponível" },
    ]);
    setSolicitacoes([
      { id: 1, equipamentoId: 4, equipamentoNome: "Furadeira DeWalt 20V", usuario: "João Silva", local: "Setor A", data: "2025-11-12 09:30", status: "Pendente" },
      { id: 2, equipamentoId: 5, equipamentoNome: "Serra Circular Makita", usuario: "Maria Santos", local: "Linha 3", data: "2025-11-12 10:10", status: "Pendente" },
    ]);
    setEmUso([
      { id: 1, equipamentoId: 3, equipamentoNome: "Esmerilhadeira BOSCH GWS 115", usuario: "Carlos Lima", local: "Setor B", dataInicio: "2025-11-10" },
    ]);
  }, [user]); // Dependência 'user' para rodar só depois do login

  // --- 3. FUNÇÃO DE LOGOUT ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    router.push('/');
  };

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
      setEquipamentos((prev) => prev.map((e) => (e.id === equip.id ? equip : e)));
      setToast({ type: "success", message: "✅ Equipamento atualizado com sucesso!" });
    } else {
      setEquipamentos((prev) => [...prev, { ...equip, id: Date.now() }]);
      setToast({ type: "success", message: "✅ Novo equipamento cadastrado!" });
    }
    fecharModal();
  };

  const excluirEquipamento = (id) => {
    setEquipamentos((prev) => prev.filter((e) => e.id !== id));
    setToast({ type: "danger", message: "❌ Equipamento excluído." });
  };

  const aprovarSolicitacao = (id) => {
    const solicitacao = solicitacoes.find((s) => s.id === id);
    if (!solicitacao) return;
    setEquipamentos((prev) => prev.map((eq) => eq.id === solicitacao.equipamentoId ? { ...eq, status: "Em Uso" } : eq));
    const novoUso = {
      id: Date.now(),
      equipamentoId: solicitacao.equipamentoId,
      equipamentoNome: solicitacao.equipamentoNome,
      usuario: solicitacao.usuario,
      local: solicitacao.local,
      dataInicio: new Date().toISOString().split("T")[0],
    };
    setEmUso((prev) => [...prev, novoUso]);
    setSolicitacoes((prev) => prev.filter((s) => s.id !== id));
    setToast({ type: "success", message: `✅ Solicitação aprovada! Equipamento "${solicitacao.equipamentoNome}" movido para Em uso.` });
  };

  const recusarSolicitacao = (id) => {
    setSolicitacoes((prev) => prev.filter((s) => s.id !== id));
    setToast({ type: "danger", message: "❌ Solicitação recusada com sucesso." });
  };

  const devolverEquipamento = (loanId) => {
    const itemEmUso = emUso.find((e) => e.id === loanId);
    if (!itemEmUso) return;
    setEquipamentos((prev) => prev.map((eq) => eq.id === itemEmUso.equipamentoId ? { ...eq, status: "Disponível" } : eq));
    setEmUso((prev) => prev.filter((e) => e.id !== loanId));
    setToast({ type: "success", message: `✅ Equipamento "${itemEmUso.equipamentoNome}" devolvido com sucesso!` });
  };

  const fecharToast = () => setToast(null);

  // SE NÃO TIVER USER CARREGADO AINDA, NÃO MOSTRA NADA (Evita piscar tela de erro)
  if (!user) return null; 

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
                animation: "pulse 2s infinite",
                flexShrink: 0,
              }}
            >
              <FaTools size={24} className="text-white" />
            </div>
            <div>
              <h1 className="h5 fw-bold mb-1 text-nowrap">Equipamentos - GA</h1>
              <p className="small text-light opacity-75 mb-0 d-none d-md-block">Painel de Administração</p>
            </div>
          </div>

          <div className="dropdown text-center position-relative" ref={menuRef}>
            <button
              className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2 rounded-pill px-3 py-2 user-menu-button"
              id="userMenu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* --- IMAGEM E NOME DINÂMICOS DO USUÁRIO --- */}
              <img
                src={user.foto}
                alt={user.nome}
                className="rounded-circle border border-light"
                width="32"
                height="32"
                style={{ objectFit: 'cover' }}
              />
              <span className="fw-semibold d-none d-md-block">{user.nome}</span>
              <FaChevronDown />
            </button>

            <ul
              className={`dropdown-menu shadow-sm border-0 p-2 start-50 translate-middle-x margem_menu ${isMenuOpen ? "show" : ""}`}
              style={{ minWidth: "200px" }}
            >
              <li><h6 className="dropdown-header text-muted">Perfil</h6></li>
              <li>
                <Link className="text-none" href={"./perfil"}>
                  <button className="dropdown-item d-flex align-items-center gap-2"><FaUserCircle /> Meu Perfil</button>
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                {/* --- BOTÃO SAIR AGORA FUNCIONA --- */}
                <button className="dropdown-item text-danger d-flex align-items-center gap-2" onClick={handleLogout}>
                  <FaSignOutAlt /> Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* ... Restante do código (Main, Painéis, Abas) permanece igual ... */}
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
          <div className="col-lg-8">
            <div className="overview-panel p-3 d-flex align-items-center gap-3">
              <div className="brand-badge"><FaTools size={28} /></div>
              <div className="flex-grow-1">
                <h3 className="mb-0">Painel de Controle — Equipamentos GA</h3>
                <p className="mb-0 small text-muted">Gerencie equipamentos, solicitações e ferramentas em uso.</p>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-primary-solid" onClick={() => abrirModal("novoEquip")}>
                  <FaBoxes className="me-1" /> Novo Equipamento
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="stats-panel p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-center text-primary">
                  <small className="text-muted">Equipamentos</small>
                  <h4 className="mb-0">{equipamentos.length}</h4>
                </div>
                <div className="text-center text-warning">
                  <small className="text-muted">Em Uso</small>
                  <h4 className="mb-0">{emUso.length}</h4>
                </div>
                <div className="text-center text-danger">
                  <small className="text-muted">Solicitações</small>
                  <h4 className="mb-0">{solicitacoes.length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="nav-dashboard mb-3 overflow-auto flex-nowrap">
          <button className={`tab ${abaAtiva === "equipamentos" ? "active" : ""}`} onClick={() => setAbaAtiva("equipamentos")}>
            <FaTools className="me-2" /> Equipamentos
          </button>
          <button className={`tab ${abaAtiva === "solicitacoes" ? "active" : ""}`} onClick={() => setAbaAtiva("solicitacoes")}>
            <FaClipboardList className="me-2" /> Solicitações
          </button>
          <button className={`tab ${abaAtiva === "emuso" ? "active" : ""}`} onClick={() => setAbaAtiva("emuso")}>
            <FaBoxes className="me-2" /> Em Uso
          </button>
        </nav>

        <div className="row">
          {abaAtiva === "equipamentos" && (
            <div className="col-12">
              <div className="row g-4">
                {equipamentos.map((eq) => (
                  <div className="col-md-6 col-lg-4" key={eq.id}>
                    <article className="card-card h-100">
                      <div className="card-top" style={{ background: "linear-gradient(135deg, rgba(3,102,204,0.95), rgba(0,176,255,0.85))" }}>
                        <div className="card-icon"><FaBoxes size={28} /></div>
                        <div className="card-quick"><small className="text-light d-block mt-1">{eq.categoria} · {eq.codigo}</small></div>
                      </div>
                      <div className="card-body p-3">
                        <h5 className="card-title mb-1">{eq.nome}</h5>
                        <span className={`badge ${eq.status === "Disponível" ? "bg-success" : eq.status === "Em Uso" ? "bg-warning text-dark" : "bg-danger"}`}>{eq.status}</span>
                        <p className="text-muted small mb-2 mt-2"><FaInfoCircle className="me-1" /> Local: <strong>{eq.local}</strong></p>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div className="actions">
                            <button className="btn btn-sm btn-outline" title="Editar" onClick={() => abrirModal("editarEquip", eq)}><FaEdit /></button>
                            <button className="btn btn-sm btn-danger ms-2" onClick={() => excluirEquipamento(eq.id)}><FaTimes /></button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaAtiva === "solicitacoes" && (
            <div className="col-12">
              <div className="row g-4">
                {solicitacoes.map((s) => (
                  <div className="col-md-6" key={s.id}>
                    <div className="request-card p-3">
                      <div className="d-flex justify-content-between flex-column flex-sm-row">
                        <div>
                          <h6 className="mb-1">{s.equipamentoNome}</h6>
                          <small className="text-muted">Solicitante: {s.usuario} · {s.local}</small>
                        </div>
                        <div className="text-start text-sm-end mt-2 mt-sm-0">
                          <span className="badge bg-warning text-dark">{s.status}</span>
                        </div>
                      </div>
                      <div className="mt-3 d-flex gap-2">
                        <button className="btn btn-success" onClick={() => aprovarSolicitacao(s.id)}><FaCheck /> Aprovar</button>
                        <button className="btn btn-danger" onClick={() => recusarSolicitacao(s.id)}><FaTimes /> Recusar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaAtiva === "emuso" && (
            <div className="col-12">
              <div className="row g-4">
                {emUso.map((e) => (
                  <div className="col-md-6 col-lg-4" key={e.id}>
                    <div className="request-card p-3 h-100 d-flex flex-column justify-content-between">
                      <div>
                        <h6 className="mb-1">{e.equipamentoNome}</h6>
                        <p className="text-muted small mb-2"><FaInfoCircle className="me-1" /> Responsável: <strong>{e.usuario}</strong></p>
                        <p className="text-muted small mb-0">Local: <strong>{e.local}</strong></p>
                        <p className="text-muted small">Desde: <strong>{e.dataInicio}</strong></p>
                      </div>
                      <div>
                        <button className="btn btn-outline-secondary w-100 mt-3" onClick={() => devolverEquipamento(e.id)}>Devolver Equipamento</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {modalOpen && (
          <div className="pagmodal-backdrop" onClick={fecharModal}>
            <div className="pagmodal" onClick={(e) => e.stopPropagation()}>
              <div className="pagmodal-header">
                <h5 className="mb-0">{modalData?.tipo === "editarEquip" ? "Editar Equipamento" : "Novo Equipamento"}</h5>
                <button className="btn-close" onClick={fecharModal}></button>
              </div>
              <FormEquipamento onSave={salvarEquipamento} onCancel={fecharModal} initialData={modalData?.item} />
            </div>
          </div>
        )}
      </main>
    </>
  );
}