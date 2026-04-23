# 🚀 Dev Todo List - Time Tracker

Um sistema simples de gerenciamento de tarefas para desenvolvedores, focado em rastreamento de tempo (Time Tracking).

## 🛠️ Tecnologias
- **Node.js** (Runtime)
- **TypeScript** (Linguagem)
- **Express** (Framework Web)
- **Drizzle ORM** (Banco de Dados)
- **MySQL** (Banco de Dados)

---

## 📈 Guia de Estudo (Passo a Passo)

Siga estas etapas para construir o projeto do zero e aprender os conceitos fundamentais.

### 1. Modelagem de Dados (O Coração do App)
O primeiro passo é definir como os dados se relacionam. Precisamos de mais duas tabelas além de `devs`:
- [ ] **Projetos**: Para agrupar as tarefas.
- [ ] **Logs de Tempo**: Onde salvaremos quando o dev deu "Play" e "Stop" em uma tarefa.

### 2. Implementação do Schema
No Drizzle, você deve criar as tabelas no código:
- [ ] Criar `src/db/schema/projects.ts` (relacionado ao `dev_id`).
- [ ] Criar `src/db/schema/time_logs.ts` (com colunas: `inicio`, `fim`, `tipo` [suporte/dev]).
- [ ] Rodar `npm run db:generate` e `npm run db:migrate`.

### 3. Criando as Funções de Serviço (Lógica de Negócio)
Antes de criar rotas, crie funções simples que interagem com o banco:
- [ ] Função para cadastrar um novo projeto.
- [ ] Função para "Iniciar cronômetro" (insere um log com `inicio` = agora).
- [ ] Função para "Parar cronômetro" (atualiza o log com `fim` = agora).

### 4. O Desafio: Cálculo de Tempo 🧮
Aqui é onde você vai estudar lógica:
- [ ] Criar uma função que soma todos os logs de um projeto.
- [ ] Diferenciar o tempo total de "Desenvolvimento" vs "Suporte".
- [ ] **Dica:** Use a biblioteca `date-fns` ou `dayjs` para facilitar os cálculos de diferença de horas.

### 5. API Express (Interface)
Agora que a lógica funciona, exponha isso via HTTP:
- [ ] `POST /devs`: Criar dev.
- [ ] `POST /projects`: Criar projeto.
- [ ] `POST /logs/start`: Iniciar tarefa.
- [ ] `PATCH /logs/stop`: Finalizar tarefa.
- [ ] `GET /projects/:id/report`: Retornar o resumo de tempo do projeto.

### 6. Refinamento (Extra)
- [ ] Adicionar validação de dados com **Zod**.
- [ ] Impedir que um dev inicie dois cronômetros ao mesmo tempo.

---

## 🚀 Como rodar o projeto
1. Configure o `.env` com suas credenciais do MySQL.
2. Instale as dependências: `npm install`
3. Sincronize o banco: `npm run db:push`
4. Inicie o servidor: `npm run dev`
