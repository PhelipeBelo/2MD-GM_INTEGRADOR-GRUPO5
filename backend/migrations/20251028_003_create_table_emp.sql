-- Se a tabela já existir, remova-a primeiro para recriar do zero:
-- DROP TABLE IF EXISTS equipamento_emp_ga;

CREATE TABLE IF NOT EXISTS equipamento_emp_ga (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- Relacionamentos
    equipamento_id INT NOT NULL,
    gl_id INT NOT NULL,
    
    -- Campos Logísticos (Cruciais para o Frontend)
    local_uso VARCHAR(150) NOT NULL COMMENT 'Local onde o equipamento será utilizado',
    status ENUM('Pendente', 'Aprovado', 'Recusado', 'Devolvido') NOT NULL DEFAULT 'Pendente',
    
    -- Datas de Controle
    data_devolucao DATETIME NULL COMMENT 'Preenchido apenas quando o item retorna',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Data da Solicitação',
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Chaves Estrangeiras (Mantendo sua estrutura original de Cascata)
    FOREIGN KEY (equipamento_id) REFERENCES equipamentos_ga(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
    FOREIGN KEY (gl_id) REFERENCES gl_ga(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    -- OTIMIZAÇÃO NEXUS (Índices para Performance)
    INDEX idx_busca_usuario (gl_id),         
    INDEX idx_busca_status (status),         
    INDEX idx_busca_equip (equipamento_id)  
);