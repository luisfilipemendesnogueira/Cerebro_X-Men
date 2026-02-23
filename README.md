# **CSI606 - Trabalho Final - Resultados**

## *Discente: Luis Filipe Mendes Nogueira*

### Resumo

O Cérebro é um sistema desenvolvido para localizar, monitorar e catalogar mutantes ao redor do mundo. Aqui você pode acessar os registros oficiais do Instituto Xavier, gerenciar missões, ler artigos mutantes e descobrir os heróis mais ativos nas missões pela paz entre humanos e mutantes.

Projeto full‑stack com dockerização, composto por:
- Frontend em React.js (Vite) servido via Nginx
- Backend em Java com Spring Boot (Java 17)
- Banco de dados MySQL carregado por script em: `sql/script_x-men.sql`

### 1. Funcionalidades implementadas

- Visualização de catálogo de mutantes com pesquisa por nome/alter ego.
- Registro de novos mutantes.
- Visualização de locais importantes para mutantes.
- Visualização de artigos relacionados ao universo mutante.
- Cadastro de missões com:
  - seleção de 1 a 5 heróis;
  - seleção de vilão;
  - seleção de local;
  - definição de dificuldade por estrelas.
- Visualização das missões cadastradas em painel/carrossel.
- Ranqueamento de heróis baseado nas missões realizadas e na pontuação total acumulada (com dificuldade média).

### 2. Funcionalidades previstas e não implementadas

- Nenhuma funcionalidade do escopo principal ficou sem implementação.

### 3. Outras funcionalidades implementadas

- Sistema de autenticação com login e cadastro de usuários.
- Tela de edição de perfil.
- Gestão de usuários administradores.
- Dockerização completa da aplicação (frontend, backend e banco de dados), incluindo carregamento inicial do banco por script SQL.

### 4. Principais desafios e dificuldades

- Integração entre frontend, backend e banco de dados no ambiente containerizado.
- Modelagem da lógica de missão com múltiplos heróis e atualização de estatísticas de ranking de forma consistente.
- Implementação de upload de imagens para mutantes/perfil, com persistência e organização de diretórios.
- Definição de regras de acesso (usuário comum vs. admin) sem comprometer a navegação e a usabilidade.

Para superar esses pontos, foram adotados:
- `docker-compose` com dependência e `healthcheck` para o banco;
- transações no cadastro de missões (inserção da missão + vínculo com heróis + atualização de pontuação);
- validações de entrada no frontend e backend;
- separação de telas e rotas protegidas por tipo de perfil.

### 5. Instruções para instalação e execução

#### Pré‑requisitos

- Docker e Docker Compose instalados
- Portas livres: `3306`, `8080`, `5174`

#### Como rodar no Docker

1. Clonar ou baixar o repositório.

2. No diretório raiz do projeto (`Cerebro_X-Men/`), execute:
   
   ```bash
   docker compose up --build -d
   ```

3. Acesse a aplicação em: http://localhost:5174

4. Aguarde alguns segundos até que o banco de dados seja carregado no frontend.

5. Para parar os serviços:
   
   ```bash
   docker compose down
   ```

> Observação: para reiniciar do zero (apagando dados do MySQL e uploads), use `docker compose down -v`. Isso remove o volume `db_data` e você perderá os dados novos adicionados.

---

- Usuários administradores padrão para acessar na tela de login:
  - Usuário: `professor_x` / Senha: `professor123`
  - Usuário: `ciclope` / Senha: `scott123`
