'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginPage() {
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);

    const handleLoginClick = () => {
        setIsOverlayVisible(false);
    };

    const handleBackClick = () => {
        setIsOverlayVisible(true);
    };

    
    const containerClasses = `${styles.loginContainer} ${!isOverlayVisible ? styles.reveal : ''}`;

    return (
        <main className={containerClasses}>

            <div className={styles.formPanelLeft}>
                <form className="p-5 text-center">
                    <h1 className="fw-bold mb-3">Faça o login</h1>
                    <p>Insira seu GMIN:</p>
                    <input 
                        type="text" 
                        className="form-control mb-3" 
                    />
                    <button type="submit" className="btn btn-primary w-100">Validar</button>
                    <button 
                        type="button" 
                        className="btn btn-link mt-3" 
                        onClick={handleBackClick}>
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

        
            <div className={styles.carWrapper}>
                <Image 
                    src="/img/carro2.png"
                    alt="Carro" 
                    width={350} 
                    height={175}
                    className={styles.carImage}
                    priority
                />
            </div>
        </main>
    );
}
