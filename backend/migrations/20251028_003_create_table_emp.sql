
CREATE TABLE IF NOT EXISTS equipamento_emp_ga (
    id INT PRIMARY KEY AUTO_INCREMENT,

    equipamento_id INT NOT NULL,

    gl_id INT NOT NULL,

    FOREIGN KEY (equipamento_id) REFERENCES equipamentos_ga(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
    FOREIGN KEY (gl_id) REFERENCES gl_ga(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    UNIQUE KEY uk_equip_gl (equipamento_id, gl_id),

    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
