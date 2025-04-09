# Saúde Local 

Este projeto foi desenvolvido como parte da disciplina de Empreendedorismo do curso de Ciência da Computação do IFBA.

## Visão Geral
Saúde Local é uma aplicação abrangente projetada para auxiliar os usuários no gerenciamento de suas necessidades relacionadas à saúde. Ele fornece funcionalidades para registro de usuários, login e acesso a diversos serviços de saúde, incluindo hospitais, clínicas e serviços de emergência. O aplicativo integra-se com APIs externas para fornecer informações em tempo real e oferece recursos como telemedicina, verificação de disponibilidade de medicamentos e suporte comunitário.

## Recursos
- **Autenticação de Usuário**: Os usuários podem fazer login, registrar-se ou continuar sem uma conta para acesso limitado.
- **Acompanhamento de Condições de Saúde**: Os usuários podem se registrar com suas condições de saúde, idade, nome e e-mail.
- **Integração de API**: Conecta-se a uma API gratuita para pesquisar hospitais, clínicas, corpo de bombeiros e delegacias com base na localização do usuário.
- **Filtros Personalizados**: Os usuários podem filtrar unidades de saúde por especialidade médica, tempos estimados de espera e avaliações da comunidade.
- **Avaliações de Serviços**: Os usuários podem avaliar serviços com base na qualidade do atendimento, limpeza e experiência geral.
- **Botão de Emergência**: Acesso rápido para chamar serviços de emergência como ambulâncias e corpo de bombeiros.
- **Disponibilidade de Medicamentos**: Os usuários podem verificar a disponibilidade de medicamentos essenciais em farmácias locais e unidades de saúde.
- **Integração com Telemedicina**: Conecta os usuários a serviços de teleconsulta para casos não urgentes.
- **Notificações Inteligentes**: Os usuários recebem notificações sobre novas clínicas, mudanças no tempo de espera e campanhas de vacinação.
- **Histórico e Favoritos**: Os usuários podem salvar locais frequentemente visitados para acesso rápido.
- **Chat Comunitário**: Um fórum para os usuários compartilharem informações e experiências sobre serviços de saúde.

## Estrutura do Projeto
```
health-app
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── app.js
│   ├── package.json
│   ├── .env
│   └── README.md
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   ├── package.json
│   └── README.md
├── database
│   ├── migrations
│   ├── seeders
│   ├── config.js
│   └── README.md
└── README.md
```

## Começando

### Pré-requisitos
- Node.js
- npm
- MongoDB (ou qualquer outro banco de dados de sua escolha)

### Instalação

1. Clone o repositório:
   ```
   git clone <url-do-repositório>
   cd health-app
   ```

2. Configure o backend:
   - Navegue até o diretório `backend`:
     ```
     cd backend
     ```
   - Instale as dependências:
     ```
     npm install
     ```
   - Crie um arquivo `.env` e configure suas variáveis de ambiente.

3. Configure o frontend:
   - Navegue até o diretório `frontend`:
     ```
     cd ../frontend
     ```
   - Instale as dependências:
     ```
     npm install
     ```

4. Configure o banco de dados:
   - Navegue até o diretório `database` e siga as instruções no README.md para migrações e seeders.

### Executando a Aplicação

- Inicie o servidor backend:
  ```
  cd backend
  npm start
  ```

- Inicie a aplicação frontend:
  ```
  cd frontend
  npm start
  ```

