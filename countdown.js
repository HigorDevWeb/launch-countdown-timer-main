// Define a data alvo para o contador regressivo, somando 2080 horas (aproximadamente 87 dias) à hora atual.
const countToDate = new Date().setHours(new Date().getHours() + 2080);
// Variável para armazenar o valor anterior do tempo restante entre as datas.
let previous;

// Cria um intervalo que verifica mudanças no tempo restante a cada 250 milissegundos.
setInterval(() => {
    // Obtém a data e hora atuais.
    const currentDate = new Date();
    // Calcula a diferença em segundos entre a data alvo e a data atual.
    const timeBetweenDates = Math.floor((countToDate - currentDate) / 1000);
    
    // Verifica se houve uma mudança no tempo restante.
    if (timeBetweenDates !== previous) {
        // Chama a função para atualizar a exibição dos cartões.
        flipAllCards(timeBetweenDates);
    }
    // Atualiza o valor anterior do tempo restante.
    previous = timeBetweenDates;
}, 250);

// Função para atualizar a exibição dos cartões com base no tempo restante.
function flipAllCards(time) {
    // Converte o tempo restante em dias, horas, minutos e segundos.
    const days = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time / 3600) % 24);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = Math.floor(time % 60);
    
    // Obtém referências aos elementos de cartão para dias, horas, minutos e segundos no DOM.
    const daysCard = document.querySelector('.days > .flip-card');
    const hoursCard = document.querySelector('.hours > .flip-card');
    const minutesCard = document.querySelector('.minutes > .flip-card');
    const secondsCard = document.querySelector('.seconds > .flip-card');
    
    // Chama a função para atualizar cada cartão com o novo valor correspondente.
    flipCard(daysCard, days);
    flipCard(hoursCard, hours);
    flipCard(minutesCard, minutes);
    flipCard(secondsCard, seconds);
}

// Função para atualizar um cartão específico com um novo valor.
function flipCard(flipCard, time) {
    // Formata o tempo como uma string de dois dígitos.
    time = String(time).padStart(2, '0');
    // Obtém o valor atual no topo do cartão.
    const currentValue = flipCard.querySelector('.top').innerText;
    
    // Se o novo tempo for igual ao valor atual, a função não faz nada.
    if (time == currentValue) return;

    // Cria elementos HTML representando a parte superior e inferior do cartão virado.
    const topFlip = document.createElement('div');
    topFlip.classList.add('top-flip');
    topFlip.innerText = currentValue;

    const bottomFlip = document.createElement('div');
    bottomFlip.classList.add('bottom-flip');
    bottomFlip.innerText = time;

    // Obtém referências às partes superior e inferior do cartão.
    const topHalf = flipCard.querySelector('.top');
    const bottomHalf = flipCard.querySelector('.bottom');

    // Adiciona ouvintes de evento para o início e o final da animação.
    topFlip.addEventListener('animationstart', () => {
        // Atualiza o valor no topo do cartão quando a animação começa.
        topHalf.innerText = time;
    });

    topFlip.addEventListener('animationend', () => {
        // Remove o elemento superior virado após a animação.
        topFlip.remove();
    });

    bottomFlip.addEventListener('animationend', () => {
        // Atualiza o valor na parte inferior do cartão e remove o elemento inferior virado.
        bottomHalf.innerText = time;
        bottomFlip.remove();
    });

    // Anexa os elementos superior e inferior ao cartão.
    flipCard.appendChild(topFlip);
    flipCard.appendChild(bottomFlip);
}
