document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const espaco = "<br>"
    disabledChat();

    //Dados do usuário e variaveis de controle
    let userNome;
    let messageCount;
    let opcaoAjuda;
    let falarNome = false;
    let firstMessage = true;
    let realizandoTeste = false;
    let softSkills = [
        { nome: "Empatia", pontuacao: 0, descricao: "Capacidade de se colocar no lugar do outro." },
        { nome: "Comunicação", pontuacao: 0, descricao: "Habilidade de se expressar e ouvir com clareza." },
        { nome: "Trabalho em equipe", pontuacao: 0, descricao: "Colaboração eficaz com outras pessoas." },
        { nome: "Resiliência", pontuacao: 0, descricao: "Capacidade de lidar com dificuldades e se recuperar." },
        { nome: "Criatividade", pontuacao: 0, descricao: "Capacidade de gerar ideias novas e resolver problemas de forma inovadora." },
        { nome: "Proatividade", pontuacao: 0, descricao: "Agir antes que os problemas apareçam, tomar iniciativa." },
        { nome: "Liderança", pontuacao: 0, descricao: "Guiar, inspirar e influenciar positivamente os outros." },
        { nome: "Adaptabilidade", pontuacao: 0, descricao: "Flexibilidade para lidar com mudanças e novos contextos." },
        { nome: "Organização", pontuacao: 0, descricao: "Planejamento e controle eficaz do tempo e tarefas." },
        { nome: "Inteligência emocional", pontuacao: 0, descricao: "Reconhecer e gerenciar as próprias emoções e as dos outros." },
        { nome: "Autonomia", pontuacao: 0, descricao: "Capacidade de agir com independência e responsabilidade." },
        { nome: "Escuta ativa", pontuacao: 0, descricao: "Ouvir com atenção e compreensão real do outro." },
        { nome: "Relacionamento interpessoal", pontuacao: 0, descricao: "Habilidade de se relacionar bem com outras pessoas." },
        { nome: "Humildade", pontuacao: 0, descricao: "Reconhecer limitações e valorizar os outros." },
        { nome: "Assertividade", pontuacao: 0, descricao: "Expressar ideias e sentimentos com clareza e respeito." },
        { nome: "Curiosidade", pontuacao: 0, descricao: "Desejo de aprender e descobrir coisas novas." },
        { nome: "Disciplina", pontuacao: 0, descricao: "Manter foco e constância para cumprir tarefas e objetivos." },
        { nome: "Coragem", pontuacao: 0, descricao: "Enfrentar desafios e riscos com firmeza." },
        { nome: "Foco", pontuacao: 0, descricao: "Concentrar-se no que é importante, evitando distrações." },
        { nome: "Autocrítica", pontuacao: 0, descricao: "Capacidade de refletir e reconhecer os próprios erros." },
        { nome: "Melhoria contínua", pontuacao: 0, descricao: "Buscar evoluir constantemente em tudo que faz." },
        { nome: "Planejamento", pontuacao: 0, descricao: "Definir metas, estratégias e ações para alcançar objetivos." },
        { nome: "Estética", pontuacao: 0, descricao: "Atenção à harmonia visual e bom gosto nas apresentações." },
        { nome: "Improvisação", pontuacao: 0, descricao: "Responder com criatividade e rapidez a situações inesperadas." }
    ];

        //Debug
        /* messageCount = 7
        softSkills = [
            { nome: "Empatia", pontuacao: 3, descricao: "Capacidade de se colocar no lugar do outro." },
            { nome: "Comunicação", pontuacao: 2, descricao: "Habilidade de se expressar e ouvir com clareza." },
            { nome: "Trabalho em equipe", pontuacao: 1, descricao: "Colaboração eficaz com outras pessoas." }
        ]; */

    // Mensagem inicial do bot
    addBotMessage('Olá! Antes de iniciar, digite seu nome abaixo.', 1000);
    addBotMessage('Não precisa ter medo, não utilizamos nenhum dado sensível para outros fins.', 2000);
    enableChat(2250);
    firstMessage = true;
    
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.innerHTML = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addOptions(options = [], time) {
        setTimeout(() => {
            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('bot-message-button');
        
            options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option.text;
                button.onclick = () => {
                    optionsDiv.remove(); 
                    handleUserMessage(option);
                };
                button.style.marginRight = '8px';
                optionsDiv.appendChild(button);
            });
        
            chatMessages.appendChild(optionsDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, time)
    }

    function addBotMessage(message, time) {
        setTimeout(() => {
            addMessage(message, false);
        }, time);
    }

    function addUserMessage(message) {
        addMessage(message, true);
    }

    function enableChat(time) {
        setTimeout(() => {
            userInput.disabled = false
            userInput.setAttribute("placeholder", "Digite sua mensagem...")
        }, time);
    }

    function disabledChat(time) {
        setTimeout(() => {
            userInput.disabled = true
            userInput.setAttribute("placeholder", "Aguarde...")
        }, time);
    }

    function menu(time){
            addBotMessage('Escolha uma opção abaixo:', time);
            addOptions([{text: '1. O que são Soft Skills?', value: 1}, 
                {text:'2. Descobrir minhas Soft Skills', value: 2}, 
                {text:'3. Materiais Gratuitos', value: 3}], (time + 500))
    }

    function pontuarSoftSkill(nome, valor) {
        const skill = softSkills.find(s => s.nome === nome);
        if (skill) {
            skill.pontuacao += valor;
            if (skill.pontuacao < 0) skill.pontuacao = 0; // opcional: evita pontuação negativa
        }
    }

    function calcularPontuacaoSoftSkills(time){
        let melhoresSkills = softSkills.sort((a, b) => b.pontuacao - a.pontuacao).slice(0, 3)
        setTimeout(() => {
            addBotMessage('🥇 ' + softSkills[0].nome + ' - ' + softSkills[0].descricao + espaco + '🥈 ' + softSkills[1].nome + ' - ' + softSkills[1].descricao + espaco + '🥉 ' + softSkills[2].nome + ' - ' + softSkills[2].descricao) 
        }, time)
    }

    function handleUserMessage(messageFromButton = null) {
        disabledChat();

        if (messageFromButton instanceof Event) {
            messageFromButton = null;
        }

        const message = messageFromButton || String(userInput.value).trim();
        if (!message && !firstMessage) {
            addBotMessage("Por favor, digite algo antes de enviar.", 500);
            enableChat(1000);
            return;
        }

        console.log(message)

        let opcao;
        if (message) {
            messageCount++;
            if (typeof message === "string"){
                addUserMessage(String(message));
            } else {
                addUserMessage(message.text);
            }
            userInput.value = '';
            console.log(messageCount)
            // Chatbot
            switch(messageCount){
                case 1:
                    userNome = message;
                    if(!falarNome){
                        addBotMessage(`Olá ${userNome}, tudo bem?`, 1000);
                        falarNome = true;
                    }
                    menu(2000);
                break;
                case 2:
                    opcao = messageFromButton?.value || message;
                    if(opcao == 1){
                        //Fazer sobre soft skills
                        break;
                    }
                    if(opcao == 2){
                        opcaoAjuda = 1;
                        addBotMessage('Que bom que deseja saber mais sobre suas Soft Skills!', 1000);
                        addBotMessage('Iremos fazer um questionário com algumas perguntas sobre você.', 2000);
                        addBotMessage('E novamente, não se preocupe, não iremos utilizar nenhum dado sensível seu.', 3000);
                        addBotMessage('Vamos começar?', 4000);
                        addOptions([{text: 'Sim', value: 1}, {text: 'Não', value: 2}], 4500)
                        break;
                    } else if (opcao == 3){
                        opcaoAjuda = 2;
                        addBotMessage('Então você procura por materiais gratuitos, né?')
                        // Fazer a parte dos materiais
                        break;
                    }
                case 3:
                    if(opcaoAjuda == 1){
                        opcao = messageFromButton?.value || message;
                        if(opcao == 1){
                            let opcaoEscolhida;
                            addBotMessage('Que legal! Então vamos começar:', 1000);

                            addBotMessage('Você está em um grupo e há um conflito entre dois colegas. O que você faz?', 2000);
                            addOptions([
                                { text: 'Tento entender os dois lados e ajudar a encontrar um meio-termo.', value: 1 },
                                { text: 'Deixo que eles resolvam, não me envolvo.', value: 2 },
                                { text: 'Me posiciono para defender quem acho que está certo.', value: 3 },
                                { text: 'Sugiro que todos conversem com calma e organizo um momento para isso.', value: 4 }
                              ], 3000)
                            
                            break;
                        }
                        if(opcao == 2){
                            addBotMessage('Poxa, que pena :(', 1000)
                            addBotMessage('Irei te levar ao menu então, aguarde um momento...', 2000)
                            messageCount = 1;
                            menu(4000);
                            break;
                        }
                    }
                case 4:
                    resposta = messageFromButton?.value || message;
                    switch(resposta){
                        case 1:
                            pontuarSoftSkill("Empatia", 2);
                            pontuarSoftSkill("Escuta ativa", 1);
                            pontuarSoftSkill("Trabalho em equipe", 1);
                            pontuarSoftSkill("Comunicação", 1);
                            break;
                        case 2:
                            pontuarSoftSkill("Autonomia", 1);
                            pontuarSoftSkill("Trabalho em equipe", -2);
                            pontuarSoftSkill("Empatia", -1);
                            pontuarSoftSkill("Relacionamento interpessoal", -1);
                            break;
                        case 3:
                            pontuarSoftSkill("Assertividade", 2);
                            pontuarSoftSkill("Coragem", 1);
                            pontuarSoftSkill("Empatia", -1);
                            pontuarSoftSkill("Escuta ativa", -1);
                            break;
                        case 4:
                            pontuarSoftSkill("Liderança", 2);
                            pontuarSoftSkill("Organização", 1);
                            pontuarSoftSkill("Comunicação", 1);
                            pontuarSoftSkill("Trabalho em equipe", 1);
                            break;
                    }
                    addBotMessage('Calculando...', 1000);
                    addBotMessage('Certo, vamos para a próxima pergunta!', 4000);
                    addBotMessage('Você recebe uma tarefa nova que nunca fez antes. O que faz?', 5000);
                    addOptions([
                        { text: 'Pesquiso por conta própria e tento resolver sozinho.', value: 1 },
                        { text: 'Peço ajuda para alguém mais experiente e tento aprender com ele.', value: 2 },
                        { text: 'Fico nervoso, mas tento fazer do meu jeito mesmo assim.', value: 3 },
                        { text: 'Organizo um plano e defino o que preciso aprender antes de começar.', value: 4 }
                    ], 6000);
                    break;
                
                case 5:
                    resposta = messageFromButton?.value || message;
                    switch(resposta){
                        case 1:
                            pontuarSoftSkill("Autonomia", 2);
                            pontuarSoftSkill("Curiosidade", 1);
                            pontuarSoftSkill("Proatividade", 1);
                            pontuarSoftSkill("Trabalho em equipe", -1);
                            break;
                        case 2:
                            pontuarSoftSkill("Humildade", 1);
                            pontuarSoftSkill("Comunicação", 1);
                            pontuarSoftSkill("Curiosidade", 1);
                            pontuarSoftSkill("Escuta ativa", 1);
                            break;
                        case 3:
                            pontuarSoftSkill("Coragem", 1);
                            pontuarSoftSkill("Autonomia", 1);
                            pontuarSoftSkill("Resiliência", -1);
                            pontuarSoftSkill("Organização", -1);
                            break;
                        case 4:
                            pontuarSoftSkill("Organização", 2);
                            pontuarSoftSkill("Planejamento", 1);
                            pontuarSoftSkill("Disciplina", 1);
                            pontuarSoftSkill("Adaptabilidade", 1);
                            break;
                    }
                    addBotMessage('Calculando...', 1000);
                    addBotMessage('Certo, vamos para a próxima pergunta!', 4000);
                    addBotMessage('Você tem uma apresentação importante. Como se prepara?', 5000);
                    addOptions([
                        { text: 'Estudo bastante e ensaio sozinho até me sentir seguro.', value: 1 },
                        { text: 'Peço feedback de colegas enquanto treino.', value: 2 },
                        { text: 'Improviso na hora, confio na minha criatividade.', value: 3 },
                        { text: 'Crio slides bonitos e foco em deixar tudo visualmente organizado.', value: 4 }
                    ], 6000);
                    break;
                
                case 6:
                    resposta = messageFromButton?.value || message;
                    switch(resposta){
                        case 1:
                            pontuarSoftSkill("Disciplina", 2);
                            pontuarSoftSkill("Foco", 1);
                            pontuarSoftSkill("Resiliência", 1);
                            break;
                        case 2:
                            pontuarSoftSkill("Relacionamento interpessoal", 2);
                            pontuarSoftSkill("Comunicação", 1);
                            pontuarSoftSkill("Humildade", 1);
                            break;
                        case 3:
                            pontuarSoftSkill("Criatividade", 2);
                            pontuarSoftSkill("Coragem", 1);
                            pontuarSoftSkill("Improvisação", 1);
                            break;
                        case 4:
                            pontuarSoftSkill("Organização", 2);
                            pontuarSoftSkill("Estética", 1);
                            pontuarSoftSkill("Comunicação", 1);
                            break;
                    }
                    addBotMessage('Calculando...', 1000);
                    addBotMessage('Próxima pergunta!', 4000);
                    addBotMessage('Você está atrasado para um compromisso e seu transporte quebra. O que faz?', 5000);
                    addOptions([
                        { text: 'Procuro imediatamente uma alternativa e sigo o caminho.', value: 1 },
                        { text: 'Aviso que me atrasarei e tento remarcar.', value: 2 },
                        { text: 'Fico frustrado, mas tento manter a calma e pensar no que fazer.', value: 3 },
                        { text: 'Desisto de ir, já que o atraso compromete tudo.', value: 4 }
                    ], 6000);
                    break;
                
                case 7:
                    resposta = messageFromButton?.value || message;
                    switch(resposta){
                        case 1:
                            pontuarSoftSkill("Proatividade", 2);
                            pontuarSoftSkill("Adaptabilidade", 2);
                            break;
                        case 2:
                            pontuarSoftSkill("Comunicação", 1);
                            pontuarSoftSkill("Organização", 1);
                            break;
                        case 3:
                            pontuarSoftSkill("Resiliência", 2);
                            pontuarSoftSkill("Inteligência emocional", 1);
                            break;
                        case 4:
                            pontuarSoftSkill("Disciplina", -1);
                            pontuarSoftSkill("Comprometimento", -2);
                            break;
                    }
                    addBotMessage('Entendido...', 1000);
                    addBotMessage('Vamos para a última pergunta!', 4000);
                    addBotMessage('Você recebeu um feedback negativo. O que faz?', 5000);
                    addOptions([
                        { text: 'Aceito e tento entender como posso melhorar.', value: 1 },
                        { text: 'Fico chateado, mas reflito sobre o que ouvi.', value: 2 },
                        { text: 'Rebato o feedback com a pessoa, pois achei injusto.', value: 3 },
                        { text: 'Ignoro, não dou muita importância e sigo em frente.', value: 4 }
                    ], 6000);
                    break;
                case 8:
                    resposta = messageFromButton?.value || message;
                    switch(resposta){
                        case 1:
                            pontuarSoftSkill("Humildade", 2);
                            pontuarSoftSkill("Autocrítica", 1);
                            pontuarSoftSkill("Disciplina", 1);
                            break;
                        case 2:
                            pontuarSoftSkill("Resiliência", 1);
                            pontuarSoftSkill("Autoconhecimento", 1);
                            break;
                        case 3:
                            pontuarSoftSkill("Assertividade", 1);
                            pontuarSoftSkill("Empatia", -1);
                            break;
                        case 4:
                            pontuarSoftSkill("Autonomia", -1);
                            pontuarSoftSkill("Melhoria contínua", -2);
                            break;
                    }
                    addBotMessage('Muito bem! Terminamos o questionário.', 1000);
                    addBotMessage('Agora vou calcular quais são suas principais soft skills...', 2000);
                    addBotMessage('Parabéns! Aqui está suas melhores Soft Skills:', 5000)
                    calcularPontuacaoSoftSkills(6000);
                    addBotMessage('Também idenficamos que você precisa melhorar em alguns pontos', 8000)
                    addBotMessage('Deseja saber também quais são seus pontos fracos?', 9000)
                    addOptions([{text: 'Sim', value: 1}, {text: 'Não', value: 2}], 9500)
                    break;   
                case 9:
                    resposta = messageFromButton?.value || message 
                    if(resposta == 1){
                        //Fazer a parte dos pontos fracos.
                        break;
                    } else if(resposta == 2){
                        addBotMessage('Certo, estarei te enviando para o menu!', 1000)
                        addBotMessage('Muito obrigado por utilizar nosso Quiz! :)', 2000)
                        messageCount = 1;
                        menu(4000);
                        break;
                    }
                default: 
                    addBotMessage(`Não entendi, poderia escolher uma opção novamente?`, 1000);
                    messageCount--;
                    break;
            }
        }
    }

    sendBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
});