USE gm_api;

CREATE TABLE IF NOT EXISTS gl_ga (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'comum') NOT NULL DEFAULT 'comum',
    gmin VARCHAR(10) UNIQUE NOT NULL,
    area ENUM('Marcação Estampa', 'Molde', 'Prensa Hidráulica', 'Fresna', 'ADM') NOT NULL,
    turno TINYINT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

