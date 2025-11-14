USE gm_api;

-- Inserir usuários iniciais (senha: 123456)
-- Hash gerado com bcrypt para a senha "123456" (validado)
INSERT INTO usuarios (nome, gmin, senha, area, turno, tipo) VALUES
('Administrador', '11111', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'ADM' , 1 ,'admin'),
('João Silva', '10223', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'Molde' , 1, 'comum'),
('Maria Souza', '45429', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'Fresna', 2, 'comum');

-- Inserir produtos iniciais
INSERT INTO equipamentos_ga (nome, marca, serie) VALUES
('Parafusadeira DFT08MFMMS', 'MAKITA', 12345),
('Serra Tico Tico Industrial', 'BOSCH', 67890),
('Furadeira de Impacto com Maleta', 'MAKITA', 23456),
('Esmerilhadeira 114 3MM GWS 6-115', 'BOSCH',34567);

