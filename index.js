const configModal = document.getElementById('config-modal')
const configModalForm = document.getElementById('config-modal-form')

let sessionTimeData = parseFloat(document.getElementById('session-time').value, 10)
let breakTimeData = parseFloat(document.getElementById('break-time').value, 10)
let pomodoroCount = parseFloat(document.getElementById('pomodoros').value, 10)
let sessionType = document.getElementById('session-type')
let cicloActual = 1
let tiempoRestante = sessionTimeData * 60
let tiempoRestanteBreak = breakTimeData * 60
let isBreak = false

let intervalo
let intervaloBreak

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

    sessionTimeData = parseFloat(document.getElementById('session-time').value, 10)
    breakTimeData = parseFloat(document.getElementById('break-time').value, 10)
    pomodoroCount = parseFloat(document.getElementById('pomodoros').value, 10)
    tiempoRestante = sessionTimeData * 60

    document.getElementById('config-modal').classList.toggle('hidden')
    
    mostrarConfig()
    renderTimer()
})

function renderTimer() {
        sessionType.textContent = "Estudio..."
        let minutos = Math.floor(tiempoRestante / 60)
        let segundos = tiempoRestante % 60;
        let display = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, 0)}`
        document.getElementById('timer-display').textContent = display;
}

function renderBreakTimer() {
        sessionType.textContent = "Break..."
        let minutos = Math.floor(tiempoRestanteBreak / 60)
        let segundos = tiempoRestanteBreak % 60;
        let display = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, 0)}`
        document.getElementById('timer-display').textContent = display;
}

function iniciar() {
    console.log('Iniciando sesión estudio....')
    intervalo = setInterval(() => {
        tiempoRestante--

        renderTimer()

        if (tiempoRestante <= 0) {
            clearInterval(intervalo)
            intervalo = null

            if (cicloActual <= pomodoroCount) {
                tiempoRestante = sessionTimeData * 60
                iniciarBreak()
            }
        }
    }, 1000)
    document.getElementById('pause-btn').disabled = false
    document.getElementById('reset-btn').disabled = false
}

function iniciarBreak() {
    console.log('Iniciando Break...')
    intervaloBreak = setInterval(() => {
        tiempoRestanteBreak--

        renderBreakTimer()

        if (tiempoRestanteBreak <= 0) {
            clearInterval(intervaloBreak)
            intervaloBreak = null

            if (cicloActual < pomodoroCount) {
                cicloActual++
                tiempoRestanteBreak = breakTimeData * 60
                iniciar()
            } else {
                sessionType.textContent = "Pomodoros Completados!"
            }
        }
    }, 1000)
}

function pausar() {
    clearInterval(intervalo)
    clearInterval(intervaloBreak)
    intervalo = null
    intervaloBreak = null
}


function reset() {
    clearInterval(intervalo)
    clearInterval(intervaloBreak)
    intervalo = null
    intervaloBreak = null

    tiempoRestante = sessionTimeData * 60
    tiempoRestanteBreak = breakTimeData * 60

    document.getElementById('pause-btn').disabled = true
    document.getElementById('reset-btn').disabled = true
    
    renderTimer()
}

mostrarConfig()
renderTimer()
