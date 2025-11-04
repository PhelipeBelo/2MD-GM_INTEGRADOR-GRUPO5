# 2MD-GM - Projeto Integrador

Repositório base para desenvolvimento do projeto integrador do curso de Desenvolvimento de Sistemas da 2MD-GM.

## 📋 Sobre o Projeto

Este é um projeto base que utiliza uma arquitetura moderna de desenvolvimento full-stack, com separação entre frontend, backend e banco de dados. O projeto demonstra uma aplicação completa de gestão de produtos com autenticação, CRUD e upload de arquivos.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação e autorização
- **Bcrypt** - Criptografia de senhas
- **Multer** - Upload de arquivos
- **Helmet** - Segurança HTTP

### Frontend
- **Next.js 16** - Framework React
- **React 19** - Biblioteca JavaScript
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Ícones

### Banco de Dados
- **MySQL 5.7+** - Sistema de gerenciamento de banco de dados relacional

## 📁 Estrutura do Projeto

```
2MD-GM_INTEGRADOR/
├── backend/                 # API RESTful em Node.js
│   ├── config/             # Configurações (banco de dados, JWT)
│   ├── controllers/        # Lógica de negócio (controllers)
│   ├── middlewares/        # Middlewares (auth, upload, logs, erros)
│   ├── models/             # Modelos de dados
│   ├── routes/             # Definição de rotas
│   ├── migrations/         # Scripts SQL para criação do banco
│   ├── uploads/            # Arquivos enviados pelos usuários
│   ├── utils/              # Utilitários
│   ├── dev-utils/          # Ferramentas de desenvolvimento
│   ├── app.js              # Arquivo principal da aplicação
│   ├── package.json        # Dependências do backend
│   └── env.example         # Exemplo de variáveis de ambiente
│
├── frontend/               # Interface web em Next.js
│   ├── src/
│   │   └── app/            # Aplicação Next.js (App Router)
│   ├── public/             # Arquivos estáticos
│   ├── package.json        # Dependências do frontend
│   └── next.config.mjs     # Configuração do Next.js
│
├── bd/                     # Scripts SQL adicionais
│   └── schema.sql          # Schema do banco de dados
│
├── docs/                   # Documentação do projeto
│   └── docs.md             # Documentação adicional
│
├── LICENSE                 # Licença do projeto
└── README.md               # Este arquivo
```

## 🏗️ Arquitetura do Backend

O backend segue o padrão **MVC (Model-View-Controller)**:

### 📂 Estrutura Detalhada do Backend

```
backend/
├── config/
│   ├── database.js         # Configuração de conexão com MySQL
│   └── jwt.js              # Configuração JWT (secret, expiração)
│
├── controllers/
│   ├── AuthController.js   # Autenticação (login, registro, perfil)
│   ├── ProdutoController.js # CRUD de produtos
│   ├── CriptografiaController.js # Demonstração de criptografia
│
├── middlewares/
│   ├── authMiddleware.js   # Validação de tokens JWT
│   ├── uploadMiddleware.js # Validação e processamento de uploads
│   ├── logMiddleware.js    # Registro de requisições no banco
│   └── errorMiddleware.js  # Tratamento centralizado de erros
│
├── models/
│   ├── ProdutoModel.js     # Modelo de dados de produtos
│   └── UsuarioModel.js     # Modelo de dados de usuários
│
├── routes/
│   ├── authRotas.js        # Rotas de autenticação
│   ├── produtoRotas.js     # Rotas de produtos
│   ├── usuarioRotas.js     # Rotas de usuários (admin)
│   └── criptografiaRotas.js # Rotas educacionais
│
├── migrations/
│   ├── 20251028_001_create_database.sql      # Criação do banco
│   ├── 20251028_002_create_table_usuarios.sql # Tabela de usuários
│   ├── 20251028_003_create_table_produtos.sql # Tabela de produtos
│   ├── 20251028_004_insert_dados_iniciais.sql # Dados iniciais
│   └── 20251028_005_create_table_logs.sql    # Tabela de logs
│
└── dev-utils/
    ├── gerar-hash-senha.js # Utilitário para gerar hash de senhas
    ├── gerar-jwt-secret.js # Utilitário para gerar secret JWT
    └── verificar-logs.js   # Utilitário para verificar logs
```

## 🎨 Arquitetura do Frontend

O frontend utiliza **Next.js 16** com **App Router**:

```
frontend/
├── src/
│   └── app/
│       ├── layout.jsx      # Layout principal da aplicação
│       ├── page.jsx        # Página inicial
│       ├── globals.css     # Estilos globais
│       └── page.module.css # Estilos da página inicial
│
└── public/                 # Arquivos estáticos (imagens, ícones)
```

## 🚀 Como Começar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 5.7 ou superior)
- npm ou yarn
- Git

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd 2MD-GM_INTEGRADOR
```

### 2. Configurar o Backend

#### 2.1. Instalar Dependências

```bash
cd backend
npm install
```

#### 2.2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas credenciais:

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=produtos_api
PORT=3000
NODE_ENV=development
JWT_SECRET=seu_secret_jwt_aqui
JWT_EXPIRES_IN=1h
```

#### 2.3. Executar Migrations

Execute os arquivos SQL na ordem correta no MySQL:

1. `20251028_001_create_database.sql` - Cria o banco de dados
2. `20251028_002_create_table_usuarios.sql` - Cria tabela de usuários
3. `20251028_003_create_table_produtos.sql` - Cria tabela de produtos
4. `20251028_004_insert_dados_iniciais.sql` - Insere dados iniciais
5. `20251028_005_create_table_logs.sql` - Cria tabela de logs

#### 2.4. Iniciar o Servidor Backend

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

### 3. Configurar o Frontend

#### 3.1. Instalar Dependências

```bash
cd ../frontend
npm install
```

#### 3.2. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:3000` (ou outra porta se a 3000 estiver ocupada)

## 📚 Funcionalidades Implementadas

### Backend

- ✅ Autenticação JWT (login, registro, perfil)
- ✅ CRUD completo de produtos
- ✅ CRUD de usuários (apenas admin)
- ✅ Upload de imagens com validação
- ✅ Sistema de logs de requisições
- ✅ Paginação em listagens
- ✅ Validação de dados
- ✅ Tratamento centralizado de erros
- ✅ Middleware de autenticação
- ✅ CORS configurado

### Frontend

- ✅ Estrutura base Next.js 16
- ✅ Bootstrap 5 integrado
- ✅ Bootstrap Icons disponível
- ⚠️ Interface a ser desenvolvida pelos alunos

## 🔐 Credenciais de Teste

Após executar as migrations, você terá os seguintes usuários:

- **Admin**: `admin@produtos.com` / `123456`
- **Usuário comum**: `joao@email.com` / `123456`
- **Usuária comum**: `maria@email.com` / `123456`

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/registrar` - Registrar novo usuário
- `GET /api/auth/perfil` - Obter perfil do usuário logado

### Produtos
- `GET /api/produtos` - Listar produtos (com paginação)
- `GET /api/produtos/:id` - Buscar produto por ID
- `POST /api/produtos` - Criar produto (autenticado)
- `PUT /api/produtos/:id` - Atualizar produto (autenticado)
- `DELETE /api/produtos/:id` - Excluir produto (autenticado)
- `POST /api/produtos/upload` - Upload de imagem (autenticado)

### Usuários (Apenas Admin)
- `GET /api/usuarios` - Listar usuários (com paginação)
- `POST /api/usuarios` - Criar usuário
- `PUT /api/usuarios/:id` - Atualizar usuário
- `DELETE /api/usuarios/:id` - Excluir usuário

### Criptografia (Educacional)
- `GET /api/criptografia/info` - Informações sobre criptografia
- `POST /api/criptografia/cadastrar-usuario` - Demonstração de criptografia

## 📖 Documentação Adicional

- **Backend**: Veja o [README.md do backend](backend/README.md) para detalhes completos da API
- **Documentação**: Veja a [documentação completa](docs/docs.md)

## 🎯 Próximos Passos para os Alunos

1. **Frontend**: Desenvolver as interfaces de usuário usando Next.js e Bootstrap
2. **Integração**: Conectar o frontend com a API do backend
3. **Funcionalidades**: Implementar novas funcionalidades conforme necessário
4. **Testes**: Adicionar testes automatizados
5. **Documentação**: Completar a documentação do projeto

## 💡 Possibilidades de Projeto Integrador

Abaixo estão sugestões de projetos que podem ser desenvolvidos utilizando esta base, considerando:
- **Prazo**: 4 semanas de desenvolvimento
- **Complexidade**: Moderada (adequada para apresentação na GM)
- **Requisitos**: Utilizar a estrutura base (Node.js, Next.js, MySQL)

### 🚗 Projetos Relacionados à GM

#### 1. Sistema de Agendamento de Colaboradores da GM
**Descrição**: Sistema para gerenciar agendamentos e disponibilidade de colaboradores da GM.

**Funcionalidades principais**:
- Cadastro de colaboradores (nome, departamento, cargo)
- Calendário de disponibilidade
- Agendamento de reuniões/atividades
- Visualização de agenda por colaborador
- Notificações de agendamentos
- Relatórios de utilização

**Entidades sugeridas**: Colaboradores, Agendamentos, Departamentos

---

#### 2. Sistema de Agendamento de Manutenção de Carros da GM
**Descrição**: Sistema para controlar e agendar manutenções preventivas e corretivas de veículos da frota GM.

**Funcionalidades principais**:
- Cadastro de veículos (placa, modelo, ano, quilometragem)
- Histórico de manutenções
- Agendamento de revisões periódicas
- Controle de peças e serviços realizados
- Alertas de manutenção preventiva
- Relatórios de custos e histórico

**Entidades sugeridas**: Veículos, Manutenções, Peças, Serviços

---

#### 3. Sistema de Controle de Frotas de Carros da GM
**Descrição**: Sistema para gerenciar a frota de veículos da empresa, incluindo localização, status e utilização.

**Funcionalidades principais**:
- Cadastro completo de veículos
- Controle de status (disponível, em uso, manutenção, indisponível)
- Registro de saídas e retornos
- Controle de quilometragem
- Histórico de utilização
- Relatórios de disponibilidade e uso

**Entidades sugeridas**: Veículos, Motoristas, Saídas, Status

---

#### 4. Sistema de Controle de Turnos de Funcionários com Login e Relógio de Ponto
**Descrição**: Sistema para controle de presença e gestão de turnos dos colaboradores da GM.

**Funcionalidades principais**:
- Cadastro de funcionários e turnos
- Login seguro com autenticação JWT
- Registro de entrada e saída (relógio de ponto)
- Controle de horas trabalhadas
- Gestão de turnos (matutino, vespertino, noturno)
- Relatórios de frequência e horas extras
- Dashboard administrativo

**Entidades sugeridas**: Funcionários, Turnos, Registros de Ponto, Horas Extras

---

### 🏢 Outras Possibilidades de Projeto

#### 5. Sistema de Gestão de Estoque de Peças
**Descrição**: Controle de estoque de peças e componentes da GM.

**Funcionalidades principais**:
- Cadastro de peças e componentes
- Controle de entrada e saída
- Alertas de estoque mínimo
- Histórico de movimentações
- Relatórios de inventário
- Categorização por tipo/fornecedor

**Entidades sugeridas**: Peças, Movimentações, Fornecedores, Categorias

---

#### 6. Sistema de Solicitação de Requisições Internas
**Descrição**: Sistema para solicitação e aprovação de requisições internas (materiais, serviços, etc.).

**Funcionalidades principais**:
- Cadastro de requisições
- Fluxo de aprovação (solicitante → supervisor → gerente)
- Controle de status (pendente, aprovado, negado, atendido)
- Histórico de requisições
- Filtros por departamento/status
- Relatórios de requisições

**Entidades sugeridas**: Requisições, Departamentos, Status, Aprovações

---

#### 7. Sistema de Gestão de Treinamentos
**Descrição**: Sistema para gerenciar treinamentos e capacitações dos colaboradores.

**Funcionalidades principais**:
- Cadastro de treinamentos disponíveis
- Inscrição de colaboradores
- Controle de presença
- Emissão de certificados
- Histórico de treinamentos por colaborador
- Relatórios de participação

**Entidades sugeridas**: Treinamentos, Inscrições, Colaboradores, Certificados

---

#### 8. Sistema de Controle de Equipamentos
**Descrição**: Sistema para cadastro e controle de equipamentos da empresa.

**Funcionalidades principais**:
- Cadastro de equipamentos
- Controle de empréstimos
- Histórico de manutenções
- Localização de equipamentos
- Alertas de manutenção preventiva
- Relatórios de utilização

**Entidades sugeridas**: Equipamentos, Empréstimos, Manutenções, Localizações

---

#### 9. Sistema de Gestão de Chamados Técnicos
**Descrição**: Sistema para registro e acompanhamento de chamados técnicos e suporte.

**Funcionalidades principais**:
- Abertura de chamados
- Atribuição a técnicos
- Controle de status (aberto, em atendimento, resolvido, fechado)
- Histórico de atendimentos
- Priorização de chamados
- Relatórios de tempo médio de resolução

**Entidades sugeridas**: Chamados, Técnicos, Status, Prioridades

---

#### 10. Sistema de Avaliação de Desempenho
**Descrição**: Sistema para avaliação periódica de desempenho dos colaboradores.

**Funcionalidades principais**:
- Cadastro de avaliações
- Critérios de avaliação
- Registro de notas/comentários
- Histórico de avaliações por colaborador
- Relatórios comparativos
- Dashboard de desempenho

**Entidades sugeridas**: Avaliações, Colaboradores, Critérios, Notas

---

### 📋 Observações Importantes

- **Adaptação necessária**: Todos os projetos precisarão adaptar as entidades do modelo base (produtos) para as entidades específicas de cada projeto
- **Complexidade**: Mantenha a complexidade moderada, focando em funcionalidades essenciais e bem implementadas
- **Apresentação**: Prepare uma apresentação clara demonstrando as funcionalidades principais
- **Documentação**: Documente as decisões de design e funcionalidades implementadas
- **Testes**: Realize testes básicos das funcionalidades principais antes da apresentação

### 🎓 Dicas para o Desenvolvimento

1. **Planejamento**: Defina claramente as funcionalidades nas primeiras semanas
2. **Priorização**: Implemente primeiro as funcionalidades essenciais (CRUD básico)
3. **Interface**: Foque em uma interface limpa e intuitiva
4. **Validações**: Implemente validações adequadas nos formulários
5. **Relatórios**: Considere adicionar pelo menos um relatório simples ao sistema

## 📝 Licença

Este projeto está sob a licença GPLV3. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍🏫 Suporte

Para dúvidas ou problemas, consulte:
- Documentação do backend: `backend/README.md`
- Documentação adicional: `docs/docs.md`
- Professor responsável pelo projeto

---

**Desenvolvido para o curso de Desenvolvimento de Sistemas - 2MD-GM**
