USE gm_api;

CREATE TABLE IF NOT EXISTS logs (
    id INT PRIMARY KEY AUTO_INCREMENT,

    gl_id INT, 
    
    rota VARCHAR(255) NOT NULL,
    metodo VARCHAR(10) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status_code INT,
    tempo_resposta_ms INT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    dados_requisicao JSON,
    dados_resposta JSON,
    CONSTRAINT fk_logs_gl
        FOREIGN KEY (gl_id) 
        REFERENCES gl_ga(id) 
        ON DELETE SET NULL
);

-- Índices atualizados
CREATE INDEX idx_logs_gl_id ON logs(gl_id);
CREATE INDEX idx_logs_data_hora ON logs(data_hora);
CREATE INDEX idx_logs_rota ON logs(rota);
CREATE INDEX idx_logs_metodo ON logs(metodo);
CREATE INDEX idx_logs_status_code ON logs(status_code);