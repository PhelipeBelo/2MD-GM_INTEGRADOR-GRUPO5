'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const mockApiDatabase = {
    '12345': {
        name: 'Ana Carolina Souza',
        photoUrl: 'https://stories.cnnbrasil.com.br/wp-content/uploads/sites/9/2025/10/V%E2%9D%A4%EF%B8%8FV.jpg'
    },
    '54321': {
        name: 'Bruno Marques Silva',
        photoUrl: 'https://www.meioemensagem.com.br/wp-content/uploads/2024/03/Blog-da-Regina-2024.jpg'
    },
    '11111': {
        name: 'Carlos Eduardo Lima',
        photoUrl: 'https://i.metroimg.com/UrJuFOcQsnuuQGQ6KaPqsksEfuOjGQtStEOfr4sC7m4/w:1200/q:85/f:webp/plain/2025/08/01215806/saiba-o-desfecho-de-processo-de-suzane-von-richthofen-contra-jornalista.jpg'
    }
};


const fetchEmployeeData = (registro) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const employee = mockApiDatabase[registro];
            if (employee) {
                resolve(employee);
            } else {
                reject('Funcionário não encontrado');
            }
        }, 1000);
    });
};


export default function LoginPage() {
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);

    const [registro, setRegistro] = useState('');
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    const handleLoginClick = () => {
        setIsOverlayVisible(false);
    };

    const handleBackClick = () => {
        setIsOverlayVisible(true);
        setRegistro('');
        setEmployee(null);
        setError('');
    };

    const handleRegistroBlur = async () => {
        if (registro.trim() === '') {
            return;
        }

        setIsLoading(true);
        setEmployee(null);
        setError('');

        try {
            const data = await fetchEmployeeData(registro);
            setEmployee(data);
        } catch (err) {
            setError(String(err));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!employee) {
            setError('Por favor, insira um registro válido primeiro.');
            return;
        }
        console.log('Logando com o funcionário:', employee.name);
        alert(`Login validado para ${employee.name}`);

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

                            className={`form-control ${error ? 'is-invalid' : ''}`}
                            id="registroInput"
                            placeholder="Insira seu Registro"
                            autoComplete="off"


                            value={registro}
                            onChange={(e) => setRegistro(e.target.value)}


                            onBlur={handleRegistroBlur}


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
                        style={{ minHeight: '110px' }}
                    >
                        {isLoading && (
                            <div className="spinner-border" style={{ color: '#1d5fa0' }} role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        )}

                        {employee && !isLoading && (
                            <div className="d-flex align-items-center justify-content-center p-3 bg-light rounded w-100">
                                <img
                                    src={employee.photoUrl}
                                    alt={`Foto de ${employee.name}`}
                                    className="rounded-circle me-3"
                                    style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                />
                                <div className="text-start">
                                    <span className="d-block text-muted small">Funcionário:</span>
                                    <h5 className="mb-0">{employee.name}</h5>
                                </div>
                            </div>
                        )}

                        {!isLoading && !employee && (
                            <div className="text-muted small">
                                Digite um registro e clique fora do campo para buscar.
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 p-3"
                        style={{
                            backgroundColor: '#1d5fa0',
                            color: 'white',
                            borderColor: '#1d5fa0'
                        }}
                        disabled={!employee || isLoading}
                    >
                        Validar
                    </button>

                    <button
                        type="button"
                        className="btn btn-link mt-3"
                        onClick={handleBackClick}
                        style={{

                            color: '#1d5fa0'

                        }}
                    >
                        Voltar
                    </button>
                </form>

            </div>
            <div className={styles.formPanelRight}></div>


            <div className={styles.overlayContainer}>
                <div className={styles.overlayPanelLeft}>
                    <h1 className="fw-bold">Gerenciador de Ferramentas</h1>
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