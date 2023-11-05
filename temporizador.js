// JavaScript para las funciones del temporizador con el nuevo objeto tiempoDeEntrenamiento
// Añade esto dentro de tu bloque <script> en tu archivo HTML

// Objeto con los tiempos de entrenamiento
const tiempoDeEntrenamiento = {
    mediaHora: {
        nombre: "Media hora",
        tiempoTotal: 30 * 60,
        tiempoCalentamiento: 8 * 60,
        tiempoRutina: 30 * 60 / 2,
        tiempoRutinaFinal: 30 * 60 / 8,
        tiempoEstiramiento: 30 * 60 / 8,
        tiempoDescanso: 120,
    },
    unaHora: {
        nombre: "Una hora",
        tiempoTotal: 60 * 60,
        tiempoCalentamiento: 8 * 60,
        tiempoRutina: 60 * 60 / 2,
        tiempoRutinaFinal: 60 * 60 / 8,
        tiempoEstiramiento: 60 * 60 / 8,
        tiempoDescanso: 120,
    },
    horaYMedia: {
        nombre: "Una hora y media",
        tiempoTotal: 90 * 60,
        tiempoCalentamiento: 8 * 60,
        tiempoRutina: 90 * 60 / 2,
        tiempoRutinaFinal: 90 * 60 / 8,
        tiempoEstiramiento: 90 * 60 / 8,
        tiempoDescanso: 120
    }
};

// Variables globales para el temporizador
let tiempoRestanteTotal = 0;
let tiempoRestanteCategoria = 0;
let categoriaActual = "";
let temporizador;
let duracionElegida;



function abrirModal() { 
    const modal = document.querySelector('#tiempo-entrenamiento');
    modal.classList.remove('hidden');
} 

function cerrarModal() {
    const modal = document.querySelector('#tiempo-entrenamiento');
    modal.classList.add('hidden');
} 


function elegirDuracion(duracion) {
    duracionElegida = duracion;
    categoriaActual = "Calentamiento";
    tiempoRestanteTotal = tiempoDeEntrenamiento[`${duracion}`].tiempoTotal;
    tiempoRestanteCategoria = tiempoDeEntrenamiento[`${duracion}`].tiempoCalentamiento;
    mostrarTiempoRestante(tiempoRestanteTotal, tiempoRestanteCategoria);
    mostrarPantalla('temporizador');
}

// Agregar esta función en tu bloque <script>

function iniciarTemporizador() {
    cerrarModal();
    duracion = duracionElegida;
    if (!temporizador) {
        categoriaActual = "Calentamiento";
        tiempoRestanteTotal = tiempoDeEntrenamiento[`${duracion}`].tiempoTotal;
        tiempoRestanteCategoria = tiempoDeEntrenamiento[`${duracion}`].tiempoCalentamiento;
        mostrarTiempoRestante(tiempoRestanteTotal, tiempoRestanteCategoria);
        temporizador = setInterval(function () {
            if (tiempoRestanteTotal <= 0) {
                detenerTemporizador();
                alert("¡Tiempo de entrenamiento terminado!");
            } else if (tiempoRestanteCategoria <= 0) {
                // Cambiar a la siguiente categoría de tiempo
                switch (categoriaActual) {
                    case "Calentamiento":
                        categoriaActual = "1er Descanso";
                        tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoDescanso;
                        break;
                    case "1er Descanso":
                            categoriaActual = "Rutina";
                            tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoRutina;
                            break;
                    case "Rutina":
                        categoriaActual = "2do Descanso"; // Cambiamos a la categoría de descanso
                        tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoDescanso;
                        break;
                    case "2do Descanso":
                        categoriaActual = "Rutina Final";
                        tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoRutinaFinal;
                        break;
                    case "Rutina Final":
                        categoriaActual = "3er Descanso";
                        tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoDescanso;
                        break;
                    case "3er Descanso":
                        categoriaActual = "Estiramiento";
                        tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoEstiramiento;
                        break;
                    case "Estiramiento":
                        categoriaActual = "Terminado";
                        tiempoRestanteCategoria = 0;
                        detenerTemporizador();
                        break;
                }
            } else {
                tiempoRestanteTotal--;
                tiempoRestanteCategoria--;
            }
            mostrarTiempoRestante(tiempoRestanteTotal, tiempoRestanteCategoria);
        }, 1000); // El temporizador se actualiza cada segundo (1000 ms)
        document.getElementById("iniciar-btn").classList.add('hidden');
        document.getElementById("pausar-btn").classList.remove('hidden');

    }
    mostrarPantalla('temporizador');
}


// Agrega esta función al código JavaScript
function saltarProximaCategoria() {
    switch (categoriaActual) {
        case "Calentamiento":
            tiempoRestanteTotal -= tiempoDeEntrenamiento[duracionElegida].tiempoCalentamiento;
            categoriaActual = "1er Descanso";
            tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoDescanso;
            break;
        case "1er Descanso":
            tiempoRestanteTotal -= tiempoDeEntrenamiento[duracionElegida].tiempoDescanso;
            categoriaActual = "Rutina";
            tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoRutina;
            break;
        case "Rutina":
            tiempoRestanteTotal -= tiempoDeEntrenamiento[duracionElegida].tiempoRutina;
            categoriaActual = "2do Descanso"; // Cambiamos a la categoría de descanso
            tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoDescanso;
            break;
        case "2do Descanso":
            tiempoRestanteTotal -= tiempoDeEntrenamiento[duracionElegida].tiempoDescanso;
            categoriaActual = "Rutina Final";
            tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoRutinaFinal;
            break;
        case "Rutina Final":
            tiempoRestanteTotal -= tiempoDeEntrenamiento[duracionElegida].tiempoRutinaFinal;
            categoriaActual = "3er Descanso";
            tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoDescanso;
            break;
        case "3er Descanso":
            tiempoRestanteTotal -= tiempoDeEntrenamiento[duracionElegida].tiempoDescanso;
            categoriaActual = "Estiramiento";
            tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoEstiramiento;
            break;
        case "Estiramiento":
            categoriaActual = "Terminado";
            tiempoRestanteCategoria = 0;
            detenerTemporizador();
            break;
    }
    mostrarTiempoRestante(tiempoRestanteTotal, tiempoRestanteCategoria);
}


// Agregar estas funciones en tu bloque <script>
// Función para pausar el temporizador
function pausarTemporizador() {
    clearInterval(temporizador);
    temporizador = null;
    document.getElementById("pausar-btn").classList.add('hidden');
    document.getElementById("paused-actions").classList.remove('hidden');


}

// Función para reanudar el temporizador
function reanudarTemporizador(duracion) {
    if (!temporizador) {
        temporizador = setInterval(function () {
            if (tiempoRestanteTotal <= 0) {
                detenerTemporizador();
                alert("¡Tiempo de entrenamiento terminado!");
            } else if (tiempoRestanteCategoria <= 0) {
                // Cambiar a la siguiente categoría de tiempo
                switch (categoriaActual) {
                    case "Calentamiento":
                        categoriaActual = "1er Descanso";
                        tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoDescanso;
                        break;
                    case "1er Descanso":
                            categoriaActual = "Rutina";
                            tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoRutina;
                            break;
                    case "Rutina":
                        categoriaActual = "2do Descanso"; // Cambiamos a la categoría de descanso
                        tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoDescanso;
                        break;
                    case "2do Descanso":
                        categoriaActual = "Rutina Final";
                        tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoRutinaFinal;
                        break;
                    case "Rutina Final":
                        categoriaActual = "3er Descanso";
                        tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoDescanso;
                        break;
                    case "3er Descanso":
                        categoriaActual = "Estiramiento";
                        tiempoRestanteCategoria = tiempoDeEntrenamiento[duracionElegida].tiempoEstiramiento;
                        break;
                    case "Estiramiento":
                        categoriaActual = "Terminado";
                        tiempoRestanteCategoria = 0;
                        break;
                }
            } else {
                tiempoRestanteTotal--;
                tiempoRestanteCategoria--;
            }
            mostrarTiempoRestante(tiempoRestanteTotal, tiempoRestanteCategoria);
        }, 1000);
        document.getElementById("pausar-btn").classList.remove('hidden');
        document.getElementById("paused-actions").classList.add('hidden');

    
    }
}

// Función para detener el temporizador
function detenerTemporizador() {
    tiempoRestanteCategoria = 0;
    tiempoRestanteTotal = 0;
    clearInterval(temporizador);
    temporizador = null;
    categoriaActual = "";
    mostrarTiempoRestante(0, 0);
    reiniciarTemporizador();
    mostrarPantalla('inicio');
    
}

// Función para reiniciar el temporizador
function reiniciarTemporizador() {
    clearInterval(temporizador);
    temporizador = null;
    categoriaActual = "Calentamiento";
    tiempoRestanteTotal = tiempoDeEntrenamiento[`${duracionElegida}`].tiempoTotal;
    tiempoRestanteCategoria = tiempoDeEntrenamiento[`${duracionElegida}`].tiempoCalentamiento;
    mostrarTiempoRestante(tiempoRestanteTotal, tiempoRestanteCategoria);    

    document.getElementById("iniciar-btn").classList.remove('hidden');
    document.getElementById("pausar-btn").classList.add('hidden');
    document.getElementById("paused-actions").classList.add('hidden');
}


// Actualiza la función mostrarTiempoRestante dentro de tu bloque <script>
function mostrarTiempoRestante(total, categoria) {
    const minutosTotal = Math.floor(total / 60);
    const segundosTotal = total % 60;
    const tiempoTotalTexto = `${minutosTotal.toString().padStart(2, '0')}:${segundosTotal.toString().padStart(2, '0')}`;
    document.getElementById("tiempo-total").innerHTML = `<span class="titleTiempoTotal">Total<span/><br/><span class="total-time-content">${tiempoTotalTexto}</span>`;

    const minutosCategoria = Math.floor(categoria / 60);
    const segundosCategoria = categoria % 60;
    const tiempoCategoriaTexto = `${minutosCategoria.toString().padStart(2, '0')}:${segundosCategoria.toString().padStart(2, '0')}`;
    document.getElementById("tiempo-categoria").innerHTML = `<span class="titleCategoria">${categoriaActual.toLowerCase()}</span><br/><span class="categoria-time-content">${tiempoCategoriaTexto}</span>`;
}

