// === CONFIGURAÇÕES BÁSICAS ===
// O seu servidor está rodando na porta 3001 e usando o prefixo /api
const API_BASE_URL = 'http://localhost:3001/api';



// ==========================================
// 1. COMO FAZER UMA REQUISIÇÃO GET (Buscar dados)
// ==========================================

// ========================================== BUSCAR DEVS ===============================================

// Pegamos o botão e a div onde vamos mostrar os resultados
const btnBuscarDevs = document.getElementById('btn-buscar-devs');
const resultadoDevs = document.getElementById('resultado-devs');



// Adicionamos um "ouvinte de evento" (event listener) para o clique no botão
btnBuscarDevs.addEventListener('click', async () => {
    try {
        // Mostramos uma mensagem de carregamento enquanto a API responde
        resultadoDevs.textContent = "Carregando...";

        // O 'fetch' é a função principal do Javascript para fazer requisições web.
        // Por padrão, se não passarmos qual é o método, ele faz um 'GET'.
        // Estamos indo na rota /devs (verifique se sua rota é essa mesma no backend).
        const response = await fetch(`${API_BASE_URL}/devs`);

        // O response.ok verifica se o status HTTP foi de sucesso (ex: 200, 201)
        if (!response.ok) {
            throw new Error(`Erro na requisição: Status ${response.status}`);
        }

        // Convertemos a resposta para JSON (formato que sua API do Node devolve)
        const data = await response.json();

        // Mostramos o resultado na tela, formatado bonitinho com espaçamento (JSON.stringify)
        resultadoDevs.textContent = JSON.stringify(data, null, 2);

    } catch (error) {
        // Se der algum erro (ex: servidor desligado, rota errada), cai aqui
        console.error("Erro ao buscar atendimentos:", error);
        resultadoDevs.textContent = `Erro ao buscar dados:\n${error.message}\n\nVerifique se o backend está rodando em ${API_BASE_URL}`;
    }
});
// ========================================== FIM BUSCAR DEVS ===============================================
// ========================================== BUSCAR ATENDIMENTOS ===============================================

// Pegamos o botão e a div onde vamos mostrar os resultados
const btnBuscarAtendimentos = document.getElementById('btn-buscar-atendimentos');
const resultadoAtendimentos = document.getElementById('resultado-atendimentos');



// Adicionamos um "ouvinte de evento" (event listener) para o clique no botão
btnBuscarAtendimentos.addEventListener('click', async () => {
    try {
        // Mostramos uma mensagem de carregamento enquanto a API responde
        resultadoAtendimentos.textContent = "Carregando...";

        // O 'fetch' é a função principal do Javascript para fazer requisições web.
        // Por padrão, se não passarmos qual é o método, ele faz um 'GET'.
        // Estamos indo na rota /atendimentos (verifique se sua rota é essa mesma no backend).
        const response = await fetch(`${API_BASE_URL}/atendimentos`);

        // O response.ok verifica se o status HTTP foi de sucesso (ex: 200, 201)
        if (!response.ok) {
            throw new Error(`Erro na requisição: Status ${response.status}`);
        }

        // Convertemos a resposta para JSON (formato que sua API do Node devolve)
        const data = await response.json();

        // Mostramos o resultado na tela, formatado bonitinho com espaçamento (JSON.stringify)
        resultadoAtendimentos.textContent = JSON.stringify(data, null, 2);

    } catch (error) {
        // Se der algum erro (ex: servidor desligado, rota errada), cai aqui
        console.error("Erro ao buscar atendimentos:", error);
        resultadoAtendimentos.textContent = `Erro ao buscar dados:\n${error.message}\n\nVerifique se o backend está rodando em ${API_BASE_URL}`;
    }
});
// ========================================== FIM BUSCAR ATENDIMENTOS ===============================================

// ==========================================
// 2. COMO FAZER UMA REQUISIÇÃO POST (Enviar dados)
// ==========================================


// Atribuir  constantes
const selectDevs = document.getElementById('dev_id');
const selectAtendimentos = document.getElementById('id_atendimento');

const carregarDevs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/devs`);
        if (!response.ok) {
            throw new Error(`Erro na requisição ${response.status}`);
        }
        const data = await response.json();
        selectDevs.innerHTML = '';
        selectDevs.innerHTML += '<option selected disabled value="">Selecione um Dev...</option>';
        data.forEach(dev => {
            const option = document.createElement('option');
            option.value = dev.id;
            option.textContent = `${dev.id} - ${dev.nome}`;
            selectDevs.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao buscar devs', error);
    }
}

const carregarAtendimentos = async () => {

    try {
        const response = await fetch(`${API_BASE_URL}/atendimentos`);
        if (!response.ok) {
            throw new Error(`Erro na requisição ${response.status}`);
        }
        const data = await response.json();
        selectAtendimentos.innerHTML = '';
        selectAtendimentos.innerHTML += '<option selected disabled value="">Selecione um Atendimento...</option>';
        data.forEach(atendimento => {
            if (atendimento.ativo) {
                const option = document.createElement('option');
                option.value = atendimento.id;

                // Formatando a data de ISO para DD/MM/YYYY HH:mm
                const dataFormatada = dateFns.format(dateFns.parseISO(atendimento.inicio), 'dd/MM/yyyy HH:mm');

                option.textContent = `${atendimento.id} - ${atendimento.descricao} - ${dataFormatada}`;
                selectAtendimentos.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Erro ao buscar atendimentos', error);
    }
}

const formFinalizarAtendimento = document.getElementById('form-finalizar-atendimento');
const mensagemFinalizacao = document.getElementById('mensagem-finalizacao');

formFinalizarAtendimento.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id_atendimento = document.getElementById('id_atendimento').value;
    try {
        const response = await fetch(`${API_BASE_URL}/atendimentos/stop/${id_atendimento}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_atendimento: parseInt(id_atendimento) })
        });
        if (!response.ok) {
            throw new Error(`Erro na requisição ${response.status}`);
        }
        mensagemFinalizacao.textContent = `Atendimento finalizado com sucesso!`;
        mensagemFinalizacao.classList.remove('hidden');
        mensagemFinalizacao.classList.add('success');
        carregarAtendimentos();
    } catch (error) {
        console.error('Erro ao finalizar atendimento', error);
    }
})


// Pegamos o formulário
const formCriarAtendimento = document.getElementById('form-criar-atendimento');
const mensagemCriacao = document.getElementById('mensagem-criacao');

// Adicionamos um ouvinte para o evento 'submit' (quando o usuário clica em enviar ou dá enter)
formCriarAtendimento.addEventListener('submit', async (event) => {
    // IMPORTANTE: Isso previne que a página recarregue ao enviar o formulário
    // (comportamento padrão do HTML que nós NÃO queremos em uma Single Page Application/uso de API)
    event.preventDefault();

    // Lemos os dados que o usuário digitou no formulário
    const dev_id = document.getElementById('dev_id').value;
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;

    // Montamos o objeto/payload que a API está esperando
    // Importante: No seu validator (createAtendimentoSchema), dev_id precisa ser número.
    const payload = {
        dev_id: parseInt(dev_id), // Convertendo string para número
        tipo: tipo,
        descricao: descricao
    };

    try {
        // Agora usamos o fetch, mas passamos um objeto de opções como segundo parâmetro
        const response = await fetch(`${API_BASE_URL}/atendimentos`, {
            method: 'POST', // Dizemos que é uma criação (POST)
            headers: {
                // Dizemos ao backend que estamos mandando um JSON
                'Content-Type': 'application/json'
            },
            // Convertemos nosso objeto Javascript em uma string JSON para enviar pela rede
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            // Sucesso!
            mostrarMensagem(`Atendimento criado com sucesso! ID: ${result.id || 'ok'}`, 'sucesso');
            // Limpa o formulário após o sucesso
            formCriarAtendimento.reset();
        } else {
            // Se o backend retornou erro (ex: validação do Zod falhou), mostramos o erro
            console.error("Erro retornado pelo backend:", result);
            mostrarMensagem(`Falha ao criar: ${JSON.stringify(result)}`, 'erro');
        }

    } catch (error) {
        // Erro de rede (servidor offline, CORS, etc)
        console.error("Erro de rede:", error);
        mostrarMensagem(`Erro de rede: ${error.message}`, 'erro');
    }
});

// Função auxiliar apenas para exibir as mensagens coloridas na tela
function mostrarMensagem(texto, tipo) {
    mensagemCriacao.textContent = texto;
    mensagemCriacao.className = `mensagem-box ${tipo}`; // Remove a classe 'hidden' e adiciona sucesso/erro

    // Esconde a mensagem depois de 5 segundos
    setTimeout(() => {
        mensagemCriacao.className = 'mensagem-box hidden';
    }, 5000);
}

// ==========================================
// DICA DE OURO: PROBLEMAS COM CORS
// ==========================================
/* 
Se o seu backend e o frontend estiverem em portas diferentes (ex: backend na 3000 e 
você abriu o HTML direto ou com Live Server na 5500), o navegador vai bloquear a 
requisição por motivos de segurança, dando um erro de "CORS" no console.

Como resolver no seu backend (Express):
1. Instale o pacote cors: npm install cors
2. Instale as tipagens: npm install -D @types/cors
3. No seu arquivo principal do Express (app.ts ou server.ts), adicione:

import cors from 'cors';
const app = express();
app.use(cors()); // Isso permite que qualquer front acesse sua API.

*/

// Quando o HTML terminar de carregar, executa a função carregarDevs
document.addEventListener('DOMContentLoaded', carregarDevs);
document.addEventListener('DOMContentLoaded', carregarAtendimentos);