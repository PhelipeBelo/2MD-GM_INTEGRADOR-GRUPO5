USE gm_api;

-- Inserir usuários iniciais (senha: 123456)
-- Hash gerado com bcrypt para a senha "123456" (validado)
INSERT INTO gl_ga (nome, gmin, senha, cargo, planta, area, email, nasc, telefone, turno, tipo, icon) VALUES
('Administrador', '11111', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'Gerente ADM', 'São Caetano do Sul', 'ADM' , 'adm@gm.com', '2005-02-14', '(11) 99999-9999', 1 , 'admin' , 'https://ui-avatars.com/api/?name=AD&background=0d6efd&color=fff'),
('João Silva', '10223', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'Aprendiz de Molde', 'São José dos Campos', 'Molde' , 'joao@gm.com', '2003-08-22', '(11) 99999-1111', 1, 'comum' , 'https://img.freepik.com/fotos-gratis/jovem-bonito-vestindo-camiseta-casual-sobre-o-rosto-feliz-de-fundo-azul-sorrindo-com-os-bracos-cruzados-olhando-para-a-camera-pessoa-positiva_839833-12963.jpg?semt=ais_hybrid&w=740&q=80'),
('Maria Souza', '45429', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'Chefe de Fresna', 'Gravataí', 'Fresna', 'maria@gm.com', '2001-11-05', '(11) 99999-5555', 2, 'comum' , 'http://media-manager.noticiasaominuto.com/960/naom_6727626e336cf.webp?crop_params=eyJsYW5kc2NhcGUiOnsiY3JvcFdpZHRoIjoyNTAzLCJjcm9wSGVpZ2h0IjoxNDA4LCJjcm9wWCI6MjksImNyb3BZjozOH0sInBvcnRyYWl0Ijp7ImNyb3BXaWR0aCI6OTYwLCJjcm9wSGVpZ2h0IjoxNzA3LCJjcm9wWCI6ODQ0LCJjcm9wWSI6MH19' ),
('Pedro Alvares', '67381', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'Especialista em Molde', 'São Caetano do Sul', 'Molde', 'pedro@gm.com', '1999-03-30', '(11) 99999-2222', 1, 'comum', 'https://ui-avatars.com/api/?name=PA&background=dc3545&color=fff'),
('Ana Cristina', '80194', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'Operador Prensa', 'São José dos Campos', 'Prensa Hidráulica', 'ana@gm.com', '1997-07-17', '(11) 99999-3333', 2, 'comum', 'https://ui-avatars.com/api/?name=AC&background=198754&color=fff'),
('Lucas Mendes', '24567', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'Técnico de Estampa', 'Gravataí', 'Marcação Estampa', 'lucas@gm.com', '1996-01-12', '(11) 99999-4444', 2, 'comum', 'https://ui-avatars.com/api/?name=LM&background=ffc107&color=000');
-- Inserir produtos iniciais
INSERT INTO equipamentos_ga (nome, marca, serie) VALUES
('Parafusadeira DFT08MFMMS', 'MAKITA', 12345),
('Serra Tico Tico Industrial', 'BOSCH', 67890),
('Furadeira de Impacto com Maleta', 'MAKITA', 23456),
('Esmerilhadeira 114 3MM GWS 6-115', 'BOSCH',34567);

-- 1. Cria o usuário 'dev' com a senha 'Desenvolvedor@123'
-- O '@'%' permite que o usuário se conecte de qualquer host.
CREATE USER 'dev'@'%' IDENTIFIED BY 'Desenvolvedor@123';

-- 2. Concede todos os privilégios (ALL PRIVILEGES) para o usuário 'dev'
-- em todas as tabelas (*) do seu banco de dados (seu_database.*).
GRANT ALL PRIVILEGES ON gm_api.* TO 'dev'@'%';

-- 3. Atualiza as permissões para que as alterações entrem em vigor imediatamente.
FLUSH PRIVILEGES;