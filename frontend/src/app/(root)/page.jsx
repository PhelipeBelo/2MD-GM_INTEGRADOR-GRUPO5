'use client';

import { useState } from 'react';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);
    const [registro, setRegistro] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [employee, setEmployee] = useState(null);
    const router = useRouter();

    const handleLoginClick = () => {
        setIsOverlayVisible(false);
    };

    const handleBackClick = () => {
        setIsOverlayVisible(true);
        setRegistro('');
        setEmployee(null);
        setError('');
    };

    const handleBuscarUsuario = async () => {
        if (registro.trim() === '') return;
        if (employee && employee.gmin === registro) return;
        setIsLoading(true);
        setError('');
        setEmployee(null);

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gmin: registro.trim() }),
            });

            const data = await response.json();

            if (!response.ok || !data.sucesso) {
                throw new Error(data.mensagem || 'Funcionário não encontrado.');
            }

            setEmployee(data.dados.usuario);
            localStorage.setItem('token', data.dados.token);
            localStorage.setItem('usuario', JSON.stringify(data.dados.usuario));

        } catch (err) {
            setError(err.message);
            setEmployee(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!employee) {
            handleBuscarUsuario();
            return;
        }
        if (employee.tipo === 'admin') {
            router.push('/adm');
        } else {
            router.push('/gl');
        }
    };

    const containerClasses = `${styles.loginContainer} ${!isOverlayVisible ? styles.reveal : ''}`;

    return (
        <main className={containerClasses}>
            <div className={styles.formPanelLeft}>
                <form className="p-5 text-center" onSubmit={handleSubmit} style={{maxWidth: '500px', width: '100%'}}>
                    <h1 className="fw-bold mb-4">Faça o login</h1>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${error ? 'is-invalid' : ''} ${employee ? 'is-valid' : ''}`}
                            id="registroInput"
                            placeholder="Insira seu Registro"
                            autoComplete="off"
                            value={registro}
                            onChange={(e) => {
                                setRegistro(e.target.value);
                                if (error) setError('');
                                if (employee) setEmployee(null);
                            }}
                            onBlur={handleBuscarUsuario}
                            disabled={isLoading}
                        />
                        <label htmlFor="registroInput">Insira seu Registro</label>
                        {error && <div className="invalid-feedback text-start">{error}</div>}
                    </div>

                    <div className="text-center my-4 d-flex align-items-center justify-content-center" style={{ minHeight: '100px' }}>
                        {isLoading && (
                            <div className="spinner-border" style={{ color: '#1d5fa0' }} role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        )}

                        {!isLoading && employee && (
                            <div className="d-flex align-items-center justify-content-center p-3 bg-light rounded w-100 shadow-sm fade-in">
                                <img
                                    src={employee.icon || 'https://via.placeholder.com/60'}
                                    alt={`Foto de ${employee.nome}`}
                                    className="rounded-circle me-3"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/60?text=User'}
                                />
                                <div className="text-start">
                                    <span className="d-block text-muted small" style={{ fontSize: '0.8rem' }}>Bem-vindo(a),</span>
                                    <h5 className="mb-0 text-dark fw-bold">{employee.nome}</h5>
                                </div>
                            </div>
                        )}

                        {!isLoading && !employee && !error && (
                            <div className="text-muted small">
                                Digite seu Registro e clique fora para buscar.
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 p-3 mt-2"
                        style={{
                            backgroundColor: employee ? '#198754' : '#1d5fa0',
                            color: 'white',
                            border: 'none',
                            transition: 'background-color 0.3s'
                        }}
                        disabled={isLoading || (!!error)}
                    >
                        {isLoading ? 'Buscando...' : (employee ? 'Entrar no Sistema' : 'Validar')}
                    </button>

                    <button
                        type="button"
                        className="btn btn-link mt-3"
                        onClick={handleBackClick}
                        style={{ color: '#1d5fa0', textDecoration : 'none'}}
                    >
                        Voltar
                    </button>
                </form>
            </div>

            <div className={styles.formPanelRight}></div>

            <div className={styles.overlayContainer}>
                <div className={styles.overlayPanelLeft}>
                

                    <div className={styles.factoryWrapper}>

                        <svg className={styles.factorySvg} viewBox="0 0 340 250">
                            <g fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <rect id="factory-main" x="20" y="120" width="300" height="100" />
                                <path id="factory-roof" d="M20 120 L320 120 M20 120 L170 80 L320 120" />
                                <rect id="window1" x="50" y="140" width="30" height="40" />
                                <rect id="window2" x="100" y="140" width="30" height="40" />
                                <rect id="window3" x="150" y="140" width="30" height="40" />
                                <rect id="window4" x="200" y="140" width="30" height="40" />
                                <rect id="window5" x="250" y="140" width="30" height="40" />
                                <rect id="water-tower-post-body" x="280" y="80" width="30" height="40" />
                                <circle id="water-tower-tank" cx="295" cy="50" r="30" />
                                <text id="gm-logo-text" x="295" y="58" textAnchor="middle" fontSize="18" fill="#fff" stroke="none" style={{fontWeight: 'bold'}}>GM</text>
                            </g>
                        </svg>

                        <svg className={styles.chevyLogo} viewBox="0 0 300 120">
                            <defs>

                                <linearGradient id="chromeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#F0F0F0"/>
                                    <stop offset="20%" stopColor="#C0C0C0"/>
                                    <stop offset="50%" stopColor="#808080"/>
                                    <stop offset="80%" stopColor="#C0C0C0"/>
                                    <stop offset="100%" stopColor="#F0F0F0"/>
                                </linearGradient>

                                <linearGradient id="goldBack" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FFD700"/>
                                    <stop offset="50%" stopColor="#E6AC00"/>
                                    <stop offset="100%" stopColor="#FFD700"/>
                                </linearGradient>

  
                                <pattern id="goldDots" patternUnits="userSpaceOnUse" width="3" height="3">
                                    <rect width="3" height="3" fill="#FFD700" />
                                    <rect x="0" y="0" width="1.5" height="1.5" fill="#B8860B" opacity="0.4" />
                                    <rect x="1.5" y="1.5" width="1.5" height="1.5" fill="#B8860B" opacity="0.4" />
                                </pattern>

                                <filter id="bevelEffect" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                                    <feSpecularLighting in="blur" surfaceScale="2" specularConstant="1" specularExponent="15" lightingColor="white" result="specOut">
                                        <fePointLight x="-5000" y="-10000" z="20000"/>
                                    </feSpecularLighting>
                                    <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
                                    <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
                                </filter>
                            </defs>
                            
                            <g>
                                <path 
                                    id="chevy-outer-chrome" 
                                    d="M120 10 L180 10 L180 35 L280 35 L295 65 L180 65 L180 90 L120 90 L120 65 L20 65 L5 35 L120 35 Z"
                                    fill="url(#chromeGradient)" 
                                    stroke="#555"
                                    strokeWidth="1"
                                    filter="url(#bevelEffect)"
                                />
                                <path 
                                    id="chevy-inner-gold-base" 
                                    d="M125 15 L175 15 L175 40 L275 40 L285 60 L175 60 L175 85 L125 85 L125 60 L25 60 L15 40 L125 40 Z"
                                    fill="url(#goldBack)" 
                                />
                                <path 
                                    id="chevy-inner-gold-texture" 
                                    d="M125 15 L175 15 L175 40 L275 40 L285 60 L175 60 L175 85 L125 85 L125 60 L25 60 L15 40 L125 40 Z"
                                    fill="url(#goldDots)" 
                                />
                                <path 
                                    id="chevy-highlight" 
                                    d="M120 10 L180 10 M120 90 L180 90" 
                                    fill="none" 
                                    stroke="rgba(255,255,255,0.8)" 
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />

                            </g>
                        </svg>
                    </div>

                    <button
                        className="btn btn-outline-light btn-lg mt-3"
                        onClick={handleLoginClick}>
                        Entrar
                    </button>
                </div>
            </div>
        </main>
    );
}