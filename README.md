# **CSI606 - Proposta de Trabalho Final**

## *Discente: Luis Filipe Mendes Nogueira*

### Resumo

  Este trabalho propõe o desenvolvimento de um sistema web focado na catalogação de mutantes do universo Marvel e no gerenciamento de missões para os X-Men. O sistema permitirá a criação e atribuição de missões a heróis, visualização de informações detalhadas das missões, e um ranqueamento de mutantes baseado em suas participações. O objetivo é otimizar a organização e o acompanhamento das atividades dos X-Men.

### 1. Tema

  O trabalho final tem como tema o desenvolvimento de um sistema de catálogo de mutantes e gerenciamento de missões para os X-Men, denominado "Cérebro".

### 2. Escopo

  Este projeto terá as seguintes funcionalidades:

  - Visualização de um catálogo de mutantes.
  - Registro de novos mutantes.
  - Visualização de locais importantes para mutantes.
  - Visualização de artigos relacionados a mutantes.
  - Gerenciamento de missões realizadas.
  - Atribuição de mutantes heróis a missões.
  - Atribuição de vilões a serem derrotados nestas missões.
  - Atribuição de local que está sendo atacado pelo vilão.
  - Escolha da dificuldade da missão.
  - Visualização de todas as missões realizadas em um painel intuitivo.
  - Ranqueamento de mutantes heróis baseados nas missões realizadas e seus níveis de dificuldade.

### 3. Restrições

  Neste trabalho não serão considerados:
  - Integração com APIs externas para dados de mutantes ou missões (todos os dados serão gerenciados internamente).
  - Funcionalidades de comunicação em tempo real entre os usuários do sistema.
  - Módulos de inteligência artificial para sugestão de missões ou mutantes.
  - Desenvolvimento de aplicativos móveis nativos.

# X-Men - Cérebro

Um sistema desenvolvido para localizar, monitorar e catalogar mutantes ao redor do mundo. Aqui você pode acessar os registros oficiais do Instituto Xavier, ver os mutantes mais ativos e descobrir quem está liderando nas missões pela paz entre humanos e mutantes.

Projeto full‑stack com dockerização, composto por:
- Frontend em React.js (Vite) servido via Nginx
- Backend em Java com Spring Boot (Java 17)
- Banco de dados MySQL carregado por script em: `sql/script_x-men.sql`

## Pré‑requisitos

- Docker e Docker Compose instalados
- Portas livres: `3306`, `8080`, `5174`

## Como rodar no Docker

1. No diretório raiz do projeto (`X-Men/`), execute:
   
   ```bash
   docker compose up --build -d
   ```

2. Acesse a aplicação em: `http://localhost:5174`

3. Aguarde alguns segundos até que o banco de dados seja carregado no frontend.

4. Para parar os serviços:
   
   ```bash
   docker compose down
   ```

> Observação: para reiniciar do zero (apagando dados do MySQL e uploads), use `docker compose down -v`. Isso remove o volume `db_data` e você perderá os dados.

---
