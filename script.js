document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const espaco = "<br>"
    disabledChat();

    //Dados do usuário
    let userNome;
    let userPontuacao = 0;
    let messageCount = 0;
    let opcaoAjuda;
    let falarNome = false;

    // Mensagem inicial do bot
    addBotMessage('Olá! Antes de iniciar, digite seu nome abaixo.', 1000);
    addBotMessage('Não precisa ter medo, não utilizamos nenhum dado sensível para outros fins.', 2000);

    enableChat(2250);
    
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.innerHTML = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
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
            addBotMessage('Escolha uma opção abaixo:' + espaco + '1. Descobrir minhas Soft Skills' + espaco + '2. Matériais     Gratuítos para desenvolver minhas Soft Skills', time);
    }

    function handleUserMessage() {
        disabledChat();
        const message = userInput.value;
        let opcao;
        if (message) {
            messageCount++;
            addUserMessage(message);
            userInput.value = '';

            // Chatbot
            switch(messageCount){
                case 1:
                    userNome = message;
                    if(!falarNome){
                        addBotMessage(`Olá ${userNome}, tudo bem?`, 1000);
                        let falarNome = true;
                    }
                    menu(2000);
                    enableChat(2250);
                break;
                case 2:
                    opcao = message;
                    if(opcao == 1){
                        opcaoAjuda = 1
                        addBotMessage('Que bom que deseja saber mais sobre suas Soft Skills!', 1000);
                        addBotMessage('Iremos fazer um questionário com algumas perguntas sobre você.', 2000);
                        addBotMessage('E novamente, não se preocupe, não iremos utilizar nenhum dado sensível seu.', 3000);
                        addBotMessage('Vamos começar?' + espaco + '1. Sim' + espaco + '2. Não', 4000);
                        enableChat(4250);
                        break;
                    }
                case 3:
                    if(opcaoAjuda == 1){
                        opcao = message;
                        if(opcao == 1){
                            addBotMessage('Que legal! Então vamos começar:', 1000);
                            break;
                        }
                        if(opcao == 2){
                            addBotMessage('Poxa, que pena :(', 1000)
                            addBotMessage('Irei te levar ao menu então, aguarde um momento...', 2000)
                            messageCount = 1;
                            menu(3000);
                            enableChat(3250);
                            break;
                        }
                    }
                    
                case 4:
                default: 
                    addBotMessage(`Não entendi, poderia escolher uma opção novamente?`, 1000);
                    messageCount--;
                    enableChat(1250);
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