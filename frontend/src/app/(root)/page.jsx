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

        if (employee.tipo == 'admin') {
            router.push('/adm');
        } else {
            router.push('/gl');
        }
    };

    const containerClasses = `${styles.loginContainer} ${!isOverlayVisible ? styles.reveal : ''}`;

    return (
        <main className={containerClasses}>

            <div className={styles.formPanelLeft}>

                <form className="p-5 text-center" onSubmit={handleSubmit}>
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

                        {error && (
                            <div className="invalid-feedback text-start">
                                {error}
                            </div>
                        )}
                    </div>

                    <div
                        className="text-center my-4 d-flex align-items-center justify-content-center"
                        style={{ minHeight: '100px' }}
                    >
                        {isLoading && (
                            <div className="spinner-border" style={{ color: '#1d5fa0' }} role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        )}

                        {!isLoading && employee && (
                            <div className="d-flex align-items-center justify-content-center p-3 bg-light rounded w-100 shadow-sm fade-in">
                                <img
                                    src={employee.icon}
                                    alt={`Foto de ${employee.nome}`}
                                    className="rounded-circle me-3"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
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
                        style={{ color: '#1d5fa0' }}
                    >
                        Voltar
                    </button>
                </form>

            </div>
            <div className={styles.formPanelRight}></div>

            <div className={styles.overlayContainer}>



                <div className={styles.overlayPanelLeft}>
                    <h1 className="fw-bold">Bem Vindo!</h1>


                    <div className={styles.factoryWrapper}>


                        <svg className={styles.factorySvg} viewBox="0 0 450 250">
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


                        <svg className={styles.chevyLogo} viewBox="0 0 200 100">
                            <defs>

                                <linearGradient id="chromeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#E0E0E0"/>
                                    <stop offset="25%" stopColor="#B0B0B0"/>
                                    <stop offset="50%" stopColor="#808080"/>
                                    <stop offset="75%" stopColor="#B0B0B0"/>
                                    <stop offset="100%" stopColor="#E0E0E0"/>
                                </linearGradient>


                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FFD700"/>
                                    <stop offset="50%" stopColor="#C0A000"/>
                                    <stop offset="100%" stopColor="#FFD700"/>
                                </linearGradient>


                                <pattern id="goldDots" patternUnits="userSpaceOnUse" width="4" height="4">
                                    <circle cx="1.5" cy="1.5" r="0.5" fill="#8B6508" opacity="0.3"/>
                                </pattern>
                            </defs>
                            
                            <g>

                                <path 
                                    id="chevy-outer-shape" 
                                    d="M20 45 L50 15 L150 15 L180 45 L150 75 L50 75 Z"
                                    fill="url(#chromeGradient)" 
                                    stroke="none"
                                    opacity="0"
                                />


                                <path 
                                    id="chevy-inner-gold-base" 
                                    d="M28 45 L53 22 L147 22 L172 45 L147 68 L53 68 Z"
                                    fill="url(#goldGradient)" 
                                    stroke="none"
                                    opacity="0"
                                />


                                <path 
                                    id="chevy-inner-gold-texture" 
                                    d="M28 45 L53 22 L147 22 L172 45 L147 68 L53 68 Z"
                                    fill="url(#goldDots)" 
                                    stroke="none"
                                    opacity="0"
                                />


                                <path 
                                    id="chevy-highlight-top" 
                                    d="M20 45 L50 15 L150 15 L180 45" 
                                    fill="none" 
                                    stroke="#FFFFFF" 
                                    strokeWidth="1.5" 
                                    strokeOpacity="0.8"
                                    opacity="0"
                                />
                                <path 
                                    id="chevy-highlight-bottom" 
                                    d="M20 45 L50 75 L150 75 L180 45" 
                                    fill="none" 
                                    stroke="#505050" 
                                    strokeWidth="1.5" 
                                    strokeOpacity="0.8"
                                    opacity="0"
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