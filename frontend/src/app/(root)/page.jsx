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

        if (employee.tipo == 'ADM') {
            router.push('/admPage');
        } else {
            router.push('/glPage');
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
                    <h1 className="fw-bold">Bem Vindo de Volta!</h1>
                    <button
                        className="btn btn-outline-light btn-lg mt-3"
                        onClick={handleLoginClick}>
                        Entrar
                    </button>
                </div>
                <div className={styles.overlayPanelRight}></div>
            </div>

        </main>
    );
}