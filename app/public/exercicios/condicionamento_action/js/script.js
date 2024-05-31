// Mapeamento de temas: alterna entre 'dark' e 'light'
const themeMap = {
    dark: "light",
    light: "dark"
};

// Obtém o tema atual do localStorage ou define o tema padrão e armazena
const theme = localStorage.getItem('theme') ||
    (tmp = Object.keys(themeMap)[0],
    localStorage.setItem('theme', tmp),
    tmp);

// Adiciona a classe do tema atual ao corpo do documento
const bodyClass = document.body.classList;
bodyClass.add(theme);

// Função para alternar o tema
function toggleTheme() {
    const current = localStorage.getItem('theme');  // Obtém o tema atual
    const next = themeMap[current];  // Determina o próximo tema
    bodyClass.replace(current, next);  // Substitui a classe do corpo do documento
    localStorage.setItem('theme', next);  // Atualiza o tema no localStorage
}

// Associa a função de alternância de tema ao clique no botão de tema
document.getElementById('themeButton').onclick = toggleTheme;

// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
    const circularProgressBar = document.querySelector("#circularProgressBar");
    const circularProgressBarNumber = document.querySelector("#circularProgressBar .progress-value");
    const audio = new Audio('Alarm.mp3');

    const pomodoroTimerInSeconds = 60;  // Define o tempo do Pomodoro em segundos
    const TIMER_TYPE_POMODORO = 'POMODORO';  // Tipo de temporizador (não usado posteriormente)

    let progressInterval;  // Variável para armazenar o intervalo do temporizador
    let timerValue = pomodoroTimerInSeconds;  // Valor inicial do temporizador
    let multiplierFactor = 360 / timerValue;  // Fator de multiplicação para o progresso circular
    let isPaused = false;  // Estado de pausa do temporizador
    let timerEnded = false;  // Indica se o temporizador terminou

    // Array de objetos que representam os exercícios
    const exercicios = [
        {name: 'Flexão', src: '/exercicios/condicionamento_action/assets/flexao6.gif'},
        {name: 'Abdominal', src: '/exercicios/condicionamento_action/assets/abdominal_nice.gif'},
        {name: 'Prancha Lateral', src: '/exercicios/condicionamento_action/assets/pranchalateral4002.png'},
        {name: 'Prancha', src: '/exercicios/condicionamento_action/assets/prancha400.png'},
        {name: 'Polichinelo', src: '/exercicios/condicionamento_action/assets/polichinelo2.gif'},
        {name: 'Agachamento', src: '/exercicios/condicionamento_action/assets/agaichamento1.gif'},
        
    ];

    let currentExerciseIndex = 0;  // Índice do exercício atual

    // Função para formatar o tempo em "MM:SS"
    function formatNumberInStringMinute(number) {
        const minutes = Math.trunc(number / 60).toString().padStart(2, '0');
        const seconds = Math.trunc(number % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    // Atualiza a barra de progresso circular com o tempo restante
    function setInfoCircularProgressBar() {
        if (timerValue === 0) {
            stopTimer();  // Para o temporizador
            audio.play();  // Toca o áudio de alarme
            timerEnded = true;  // Define que o temporizador terminou
        }
        circularProgressBarNumber.textContent = formatNumberInStringMinute(timerValue);  // Atualiza o texto do tempo restante
        circularProgressBar.style.background = `conic-gradient(var(--special) ${timerValue * multiplierFactor}deg, var(--bg-secondary) 0deg)`;  // Atualiza a barra de progresso
    }

    // Inicia o temporizador
    function startTimer() {
        progressInterval = setInterval(() => {
            if (timerValue > 0) {
                timerValue--;  // Decrementa o valor do temporizador
                setInfoCircularProgressBar();  // Atualiza a barra de progresso
            }
        }, 1000);  // A cada segundo
    }

    // Para o temporizador
    function stopTimer() {
        clearInterval(progressInterval);
    }

    // Seleciona o botão de pausa/reprodução
    const pausePlayButton = document.querySelector("#pause-play");
    if (pausePlayButton) {
        pausePlayButton.addEventListener("click", () => {
            if (isPaused) {
                startTimer();  // Inicia o temporizador
                pausePlayButton.classList.remove("fa-play");
                pausePlayButton.classList.add("fa-pause");
            } else {
                stopTimer();  // Para o temporizador
                pausePlayButton.classList.remove("fa-pause");
                pausePlayButton.classList.add("fa-play");
            }
            isPaused = !isPaused;  // Alterna o estado de pausa
        });
    } else {
        console.error("Elemento #pause-play não encontrado.");
    }

    // Atualiza a imagem e o título do exercício atual
    function updateExerciseImageAndTitle() {
        console.log("Atualizando imagem e título:", exercicios[currentExerciseIndex]);
        const exerciseImage = document.getElementById("exercicio-imagem");
        const exerciseTitle = document.getElementById("exercicio-title");
        if (exerciseImage && exerciseTitle) {
            exerciseImage.src = exercicios[currentExerciseIndex].src;
            exerciseTitle.textContent = exercicios[currentExerciseIndex].name;
        } else {
            console.error("Elemento #exercicio-imagem ou #exercicio-title não encontrado.");
        }
    }

    // Mostra o modal de conclusão
    function showCompletionModal() {
        const fade = document.getElementById("completion-fade");
        const modal = document.getElementById("completion-modal");
        fade.style.display = "flex";
        modal.style.display = "flex";
    }

    // Esconde o modal de conclusão
    function hideCompletionModal() {
        const modal = document.getElementById("completion-modal");
        modal.style.display = "none";
    }

    // Navegação entre os exercícios
    function passarItem() {
        const nextExerciseButton = document.querySelector("#next-exercise");
        const previousExerciseButton = document.querySelector("#previous-exercise");

        if (nextExerciseButton) {
            nextExerciseButton.addEventListener("click", () => {
                if (timerEnded) {  // Permite avançar apenas se o temporizador tiver terminado
                    if (currentExerciseIndex < exercicios.length - 1) {
                        currentExerciseIndex++;
                    } else {
                        showCompletionModal();  // Mostra o modal de conclusão se todos os exercícios foram completados
                        stopTimer();
                    }
                    updateExerciseImageAndTitle();  // Atualiza a imagem e título do próximo exercício
                    timerEnded = false;  // Reseta o estado de término do temporizador
                    timerValue = pomodoroTimerInSeconds;  // Reseta o valor do temporizador
                    setInfoCircularProgressBar();  // Atualiza a barra de progresso
                    startTimer();  // Reinicia o temporizador
                } else {
                    window.alert("Você só pode passar para o próximo exercício quando o timer acabar.");
                }
            });
        } else {
            console.error("Elemento #next-exercise não encontrado.");
        }

        if (previousExerciseButton) {
            previousExerciseButton.addEventListener("click", () => {
                if (timerEnded) {  // Permite retroceder apenas se o temporizador tiver terminado
                    if (currentExerciseIndex > 0) {
                        currentExerciseIndex--;
                    } else {
                        currentExerciseIndex = exercicios.length - 1;
                    }
                    updateExerciseImageAndTitle();  // Atualiza a imagem e título do exercício anterior
                    timerEnded = false;  // Reseta o estado de término do temporizador
                    timerValue = pomodoroTimerInSeconds;  // Reseta o valor do temporizador
                    setInfoCircularProgressBar();  // Atualiza a barra de progresso
                    startTimer();  // Reinicia o temporizador
                } else {
                    window.alert("Você só pode passar para o exercício anterior quando o timer acabar.");
                }
            });
        } else {
            console.error("Elemento #previous-exercise não encontrado.");
        }
    }

    passarItem();  // Configura os eventos de navegação
    updateExerciseImageAndTitle();  // Atualiza a imagem e título do exercício inicial
    setInfoCircularProgressBar();  // Configura a barra de progresso inicial
    startTimer();  // Inicia o temporizador
});

// Aguarda o carregamento completo do DOM para adicionar evento de clique nos botões de voltar
document.addEventListener("DOMContentLoaded", () => {
    const exercicioDivs = document.querySelectorAll('#btn-voltar');
  
    exercicioDivs.forEach(div => {
        div.addEventListener('click', () => {
            window.location.href = '/planos';  // Redireciona para a página de planos
        });
    });
});






