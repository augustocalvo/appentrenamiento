// Función para mostrar una pantalla y actualizar el hash en la URL
function mostrarPantalla(pantalla) {
    const pages = document.querySelectorAll('.page');
    const pantallaActual = document.querySelector('.page:not(.hidden)');
    
    // Si la pantalla actual no es la misma que la pantalla a la que se va a cambiar, actualiza el historial
    if (pantallaActual.id !== pantalla) {
        window.history.pushState({ pantalla: pantalla }, '', `#${pantalla}`);
    }
    
    pages.forEach(page => page.classList.add('hidden'));
    document.getElementById(pantalla).classList.remove('hidden');

}

// Función para gestionar el evento popstate
window.addEventListener('popstate', function(event) {
    const pantalla = event.state ? event.state.pantalla : 'inicio';
    mostrarPantalla(pantalla);
});

