USE gm_api;

-- Inserir usuários iniciais (senha: 123456)
-- Hash gerado com bcrypt para a senha "123456" (validado)
INSERT INTO gl_ga (nome, gmin, senha, area, turno, tipo, icon) VALUES
('Administrador', '11111', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'ADM' , 1 , 'admin' , 'https://ui-avatars.com/api/?name=AD&background=0d6efd&color=fff'),
('João Silva', '10223', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'Molde' , 1, 'comum' , 'https://img.freepik.com/fotos-gratis/jovem-bonito-vestindo-camiseta-casual-sobre-o-rosto-feliz-de-fundo-azul-sorrindo-com-os-bracos-cruzados-olhando-para-a-camera-pessoa-positiva_839833-12963.jpg?semt=ais_hybrid&w=740&q=80'),
('Maria Souza', '45429', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'Fresna', 2, 'comum' , 'http://media-manager.noticiasaominuto.com/960/naom_6727626e336cf.webp?crop_params=eyJsYW5kc2NhcGUiOnsiY3JvcFdpZHRoIjoyNTAzLCJjcm9wSGVpZ2h0IjoxNDA4LCJjcm9wWCI6MjksImNyb3BZIjozOH0sInBvcnRyYWl0Ijp7ImNyb3BXaWR0aCI6OTYwLCJjcm9wSGVpZ2h0IjoxNzA3LCJjcm9wWCI6ODQ0LCJjcm9wWSI6MH19' );

-- Inserir produtos iniciais
INSERT INTO equipamentos_ga (nome, marca, serie) VALUES
('Parafusadeira DFT08MFMMS', 'MAKITA', 12345),
('Serra Tico Tico Industrial', 'BOSCH', 67890),
('Furadeira de Impacto com Maleta', 'MAKITA', 23456),
('Esmerilhadeira 114 3MM GWS 6-115', 'BOSCH',34567);

