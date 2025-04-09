document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Mensagem inicial do bot
    setTimeout(() => {
        addBotMessage('Olá! Como posso te ajudar hoje?');
    }, 500);

    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addBotMessage(message) {
        addMessage(message, false);
    }

    function addUserMessage(message) {
        addMessage(message, true);
    }

    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            
            // Simulação de resposta do bot
            setTimeout(() => {
                addBotMessage('Estou processando sua solicitação...');
            }, 1000);
        }
    }

    sendBtn.addEventListener('click', handleUserMessage);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
});