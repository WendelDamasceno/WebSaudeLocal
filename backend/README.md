# Saúde Local Backend

Este é o backend para o Health App, construído usando Node.js e Express. O backend fornece APIs RESTful para gerenciamento de usuários e integra-se com serviços externos para fornecer informações relacionadas à saúde.

## Recursos

- Autenticação de Usuário: Funcionalidade de login e registro para usuários.
- Gerenciamento de Dados de Saúde: Os usuários podem fornecer suas condições de saúde, idade, nome e e-mail durante o registro.
- Integração de API: Conecta-se a APIs externas para buscar hospitais, clínicas e serviços de emergência com base na localização do usuário.
- Avaliações de Usuário: Os usuários podem avaliar serviços com base na qualidade do atendimento, limpeza e experiência geral.
- Serviços de Emergência: Acesso rápido para chamar serviços de emergência diretamente do aplicativo.
- Disponibilidade de Medicamentos: Verificar a disponibilidade de medicamentos essenciais em farmácias locais e unidades de saúde.
- Integração com Telemedicina: Conectar usuários a serviços de telemedicina para casos não urgentes.
- Notificações: Os usuários recebem atualizações sobre novas clínicas, alterações nos tempos de espera e campanhas de vacinação.
- Favoritos e Histórico: Os usuários podem salvar locais frequentemente visitados para acesso rápido.
- Chat da Comunidade: Um fórum para os usuários compartilharem informações e experiências sobre serviços de saúde.

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/yourusername/health-app.git
   ```

2. Navegue até o diretório backend:
   ```
   cd health-app/backend
   ```

3. Instale as dependências:
   ```
   npm install
   ```

4. Crie um arquivo `.env` no diretório backend e configure suas variáveis de ambiente.

5. Inicie o servidor:
   ```
   npm start
   ```

## Endpoints da API

- `POST /api/users/login`: Autenticar um usuário.
- `POST /api/users/register`: Registrar um novo usuário.
- `GET /api/users/:id`: Buscar dados do usuário.


