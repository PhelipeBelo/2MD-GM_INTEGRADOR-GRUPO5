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
INSERT INTO equipamentos_ga (nome, marca, serie, descricao, foto_url, eq_status) VALUES
('Serra Circular 7-1/4"', 'Makita', 'MK-5007-MG', '220V. 1800W. Ideal para cortes em madeira de alta densidade. Verificar disco antes do uso.', 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=60', 'Disponível'),
('Parafusadeira/Furadeira Impacto', 'DeWalt', 'DW-DCD776', 'Bateria 20V MAX. Acompanha 2 baterias e carregador rápido. Torque 42Nm.', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=60', 'Disponível'),
('Esmerilhadeira Angular 4-1/2"', 'Bosch', 'BS-GWS-850', '110V. 850W. Uso obrigatório de óculos e luvas. Disco de corte não incluso.', 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=500&q=60', 'Disponível'),
('Martelete Rompedor SDS Plus', 'Hilti', 'HL-TE-30', '220V. Função perfuração e rompimento. Para concreto e alvenaria.', 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=500&q=60', 'Disponível'),
('Lixadeira Orbital', 'Makita', 'MK-BO5030', '110V. Coletor de pó integrado. Utilizar lixas com velcro.', 'https://images.unsplash.com/photo-1610505466589-6e32c9878376?auto=format&fit=crop&w=500&q=60', 'Disponível'),
('Serra Tico-Tico', 'Bosch', 'BS-GST-650', '220V. Velocidade variável. Para cortes curvos em madeira e metal.', 'https://images.unsplash.com/photo-1540652732085-81136dc40805?auto=format&fit=crop&w=500&q=60', 'Disponível'),
('Soprador Térmico', 'Vonder', 'VD-STV-150', '110V. Dois estágios de temperatura (300°C / 500°C). Para remoção de tintas e adesivos.', 'https://images.unsplash.com/photo-1565108066442-6d587a79d0bd?auto=format&fit=crop&w=500&q=60', 'Disponível'),
('Multímetro Digital', 'Fluke', 'FK-117-TRMS', 'True RMS. Para eletricistas. Medição de tensão sem contato (VoltAlert).', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=500&q=60', 'Disponível'),
('Chave de Impacto Pneumática 1/2"', 'Ingersoll Rand', 'IR-231-C', 'Ar comprimido. Torque máximo 600Nm. Necessário lubrificação diária da linha de ar.', 'https://images.unsplash.com/photo-1609346096379-281cc4dfc745?auto=format&fit=crop&w=500&q=60', 'Disponível'),
('Lavadora de Alta Pressão', 'Kärcher', 'KC-K3-TURBO', '220V. 1740 PSI. Acompanha bico turbo e aplicador de detergente. Uso na área externa.', 'https://images.unsplash.com/photo-1626723545832-4c3f47463684?auto=format&fit=crop&w=500&q=60', 'Disponível');

-- 1. Cria o usuário 'dev' com a senha 'Desenvolvedor@123'
-- O '@'%' permite que o usuário se conecte de qualquer host.
CREATE USER 'dev'@'%' IDENTIFIED BY 'Desenvolvedor@123';

-- 2. Concede todos os privilégios (ALL PRIVILEGES) para o usuário 'dev'
-- em todas as tabelas (*) do seu banco de dados (seu_database.*).
GRANT ALL PRIVILEGES ON gm_api.* TO 'dev'@'%';

-- 3. Atualiza as permissões para que as alterações entrem em vigor imediatamente.
FLUSH PRIVILEGES;