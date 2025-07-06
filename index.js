const configModal = document.getElementById('config-modal')
const configModalForm = document.getElementById('config-modal-form')

let sessionTimeData = 25
let breakTimeData = 5
let pomodoroCount = 4
let tiempoRestante = sessionTimeData * 60

let intervalo

document.addEventListener("click", function(e){
    if (e.target.closest('#config-btn') || e.target.closest('#config-close-btn')) {
        document.getElementById('config-modal').classList.toggle('hidden')
    }

    if (e.target.id === 'start-btn') {
        intervalo || iniciar() 
    }

    if (e.target.id === 'pause-btn') {
        intervalo && pausar()
    }

    if (e.target.id === 'reset-btn') {
        reset()
    }
})

function mostrarConfig() {
    const configValues = document.getElementById('config-values')
    configValues.textContent = `Sesión: ${sessionTimeData} min | Break: ${breakTimeData} min | Pomodoros: ${pomodoroCount}`
}

configModalForm.addEventListener('submit', function(e) {
    e.preventDefault()

    sessionTimeData = parseInt(document.getElementById('session-time').value, 10)
    breakTimeData = parseInt(document.getElementById('break-time').value, 10)
    pomodoroCount = parseInt(document.getElementById('pomodoros').value, 10)
    tiempoRestante = sessionTimeData * 60

    document.getElementById('config-modal').classList.toggle('hidden')
    
    renderTimer()
})

function renderTimer() {
        let minutos = Math.floor(tiempoRestante / 60)
        let segundos = tiempoRestante % 60;
        let display = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, 0)}`
        document.getElementById('timer-display').textContent = display;
}

function iniciar() {
    intervalo = setInterval(() => {
        tiempoRestante--

        renderTimer()

        if (tiempoRestante <= 0) {
            clearInterval(intervalo)
            intervalo = null
        }
    }, 1000)
    document.getElementById('pause-btn').disabled = false
    document.getElementById('reset-btn').disabled = false
}

function pausar() {
    clearInterval(intervalo)
    intervalo = null
}


function reset() {
    clearInterval(intervalo)
    intervalo = null

    tiempoRestante = sessionTimeData * 60

    document.getElementById('pause-btn').disabled = true
    document.getElementById('reset-btn').disabled = true
    
    renderTimer()
}

mostrarConfig()
