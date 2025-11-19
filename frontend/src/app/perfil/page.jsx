"use client";

import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pagPerfil.css";
import { useRouter } from 'next/navigation';

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null); // Estado inicial nulo
    const menuRef = useRef(null);
    const router = useRouter();

    // Função para formatar a data do banco (YYYY-MM-DD) para o visual (DD/MM/YYYY)
    const formatarData = (dataString) => {
        if (!dataString) return "Não informado";
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    };

    useEffect(() => {
        // 1. Puxar os dados salvos no localStorage pelo Login
        const usuarioSalvo = localStorage.getItem('usuario');
        const token = localStorage.getItem('token');

        if (!token || !usuarioSalvo) {
            // Se não tiver logado, manda de volta pro login
            router.push('/'); 
            return;
        }

        const dadosBanco = JSON.parse(usuarioSalvo);

        // 2. Mapear os dados do Banco (gl_ga) para a estrutura visual da tela
        setUser({
            nome: dadosBanco.nome,
            id: dadosBanco.gmin,         // Mapeando 'gmin' do banco para 'id' da tela
            cargo: dadosBanco.cargo,
            email: dadosBanco.email || "Sem e-mail",
            telefone: dadosBanco.telefone || "Sem telefone",
            nascimento: formatarData(dadosBanco.nasc), // Formatando a data
            setor: dadosBanco.area,      // Mapeando 'area' do banco para 'setor' da tela
            pais: dadosBanco.planta,     // Mapeando 'planta' do banco para o campo visual (rótulo é Planta)
            foto: dadosBanco.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(dadosBanco.nome)}&background=0d6efd&color=fff&size=128` // Fallback se não tiver ícone
        });

        // Lógica de fechar menu ao clicar fora
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        router.push('/');
    };

    // Enquanto carrega os dados do localStorage, não exibe nada (ou poderia ser um spinner)
    if (!user) return null;

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
                        <button 
                            onClick={() => router.back()} 
                            className="btn btn-sm btn-outline-light border-0 rounded-circle p-2 d-flex align-items-center justify-content-center"
                        >
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
                                style={{ objectFit: 'cover' }}
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
                            <li>
                                <button 
                                    className="dropdown-item text-danger gap-2 d-flex align-items-center"
                                    onClick={handleLogout}
                                >
                                    <FaSignOutAlt /> Sair
                                </button>
                            </li>
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
                                <img src={user.foto} alt="Profile" className="avatar-img" style={{objectFit: 'cover'}} />
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