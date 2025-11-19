"use client";

import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pagPerfil.css"; // Usa o CSS unificado
import {
    FaUserCircle,
    FaSignOutAlt,
    FaChevronDown,
    FaLock,
    FaIdCard,
    FaArrowLeft,
    FaEnvelope,
    FaPhone,
    FaGlobe,
    FaCalendarAlt
} from "react-icons/fa";

export default function PagPerfil() {
    // Dados do usuário (Somente Leitura)
    const user = {
        nome: "Phelipe Belo",
        id: "GL-8842",
        cargo: "Gestor Local",
        email: "phelipe.belo@gmail.com",
        telefone: "(11) 99876-5432",
        nascimento: "09/04/1980",
        setor: "Manutenção - Setor B",
        pais: "Brasil",
        foto: "https://ui-avatars.com/api/?name=Phelipe+Belo&background=0d6efd&color=fff&size=128"
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Fecha o menu ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    return (
        <>
            {/* ===== HEADER ===== */}
            <header
                className="border-bottom shadow-sm position-sticky top-0 z-3"
                style={{
                    background: "linear-gradient(135deg, rgba(3,102,204,0.95), rgba(0,176,255,0.85))",
                    color: "white",
                }}
            >
                <div className="container-fluid px-3 px-md-4 py-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-sm btn-outline-light border-0 rounded-circle p-2 d-flex align-items-center justify-content-center">
                            <FaArrowLeft />
                        </button>
                        <div>
                            <h1 className="h5 fw-bold mb-0">Meu Perfil</h1>
                        </div>
                    </div>

                    <div className="dropdown text-center position-relative" ref={menuRef}>
                        <button
                            className="btn btn-outline-light user-menu-button d-flex align-items-center justify-content-center gap-2 rounded-pill px-3 py-2"
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <img
                                src={user.foto}
                                alt="Avatar"
                                className="rounded-circle border border-light"
                                width="32"
                                height="32"
                            />
                            <span className="fw-semibold d-none d-md-block">{user.nome}</span>
                            <FaChevronDown />
                        </button>

                        <ul
                            className={`dropdown-menu shadow-sm border-0 p-2 end-0 margem_menu ${isMenuOpen ? "show" : ""}`}
                            style={{ minWidth: "200px", right: 0, left: "auto" }}
                        >
                            <li><button className="dropdown-item gap-2 d-flex align-items-center active"><FaUserCircle /> Meus Dados</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item text-danger gap-2 d-flex align-items-center"><FaSignOutAlt /> Sair</button></li>
                        </ul>
                    </div>
                </div>
            </header>

            {/* ===== CONTEÚDO PRINCIPAL ===== */}
            <main className="pagperfil-container">
                <div className="container" style={{ maxWidth: "800px" }}>

                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <h3 className="fw-bold mb-1">Ficha do Colaborador</h3>
                            <p className="text-muted mb-0">Dados cadastrais registrados no sistema.</p>
                        </div>
                    </div>

                    {/* CARD PRINCIPAL */}
                    <div className="profile-card">

                        {/* Seção 1: Avatar e Nome */}
                        <div className="profile-header-section">
                            <div className="avatar-container">
                                {/* Removido botão de câmera */}
                                <img src={user.foto} alt="Profile" className="avatar-img" />
                            </div>
                            <div className="flex-grow-1">
                                <h2 className="h4 fw-bold mb-1">{user.nome}</h2>
                                <p className="text-muted mb-2">{user.cargo}</p>

                                {/* ID Badge */}
                                <div className="id-badge">
                                    <FaIdCard className="me-2" />
                                    ID: {user.id}
                                </div>
                            </div>
                        </div>

                        {/* Seção 2: Informações Pessoais */}
                        <div className="info-section">
                            <div className="section-title">
                                <span>Informações Pessoais</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label"><FaUserCircle className="me-2 opacity-50" /> Nome</span>
                                <span className="info-value text-end text-md-start">{user.nome}</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label"><FaCalendarAlt className="me-2 opacity-50" /> Data de Nascimento</span>
                                <span className="info-value text-end text-md-start">{user.nascimento}</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label"><FaGlobe className="me-2 opacity-50" /> Planta</span>
                                <span className="info-value text-end text-md-start">{user.pais}</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label"><FaLock className="me-2 opacity-50" /> Área</span>
                                <span className="info-value text-end text-md-start">{user.setor}</span>
                            </div>
                        </div>

                        {/* Divisor */}
                        <div style={{ height: "12px", background: "#f5f8fa", borderTop: "1px solid #e7eef5", borderBottom: "1px solid #e7eef5" }}></div>

                        {/* Seção 3: Contato */}
                        <div className="info-section">
                            <div className="section-title">
                                <span>Informações de Contato</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label"><FaEnvelope className="me-2 opacity-50" /> E-mail Corporativo</span>
                                <span className="info-value text-end text-md-start">{user.email}</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label"><FaPhone className="me-2 opacity-50" /> Telefone</span>
                                <span className="info-value text-end text-md-start">{user.telefone}</span>
                            </div>
                        </div>

                        {/* Rodapé */}
                        <div className="bg-light p-3 text-center border-top">
                            <p className="text-muted small mb-0">
                                Para alterar qualquer informação, entre em contato com o RH ou Administrador do Sistema.
                            </p>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}