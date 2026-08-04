/* Navegación entre las pantallas de la aplicación. */
const Router = {
    pantallaActual: "inicio",
    historial: []
};

function cambiarPantalla(nombrePantalla, guardarEnHistorial = true) {
    const pantalla = document.getElementById(nombrePantalla);

    if (!pantalla) {
        console.error("Pantalla inexistente:", nombrePantalla);
        return;
    }

    if (guardarEnHistorial && Router.pantallaActual !== nombrePantalla) {
        Router.historial.push(Router.pantallaActual);
    }

    ocultarPantallas();
    pantalla.classList.remove("oculto");
    Router.pantallaActual = nombrePantalla;
    actualizarBotonVolver();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function ocultarPantallas() {
    document.querySelectorAll(".pantalla").forEach(pantalla => {
        pantalla.classList.add("oculto");
    });
}

function volverPantalla() {
    const anterior = Router.historial.pop();

    if (!anterior) {
        irAlInicio();
        return;
    }

    cambiarPantalla(anterior, false);
}

function irAlInicio() {
    Router.historial = [];
    cambiarPantalla("inicio", false);
}

function actualizarBotonVolver() {
    const boton = document.getElementById("btn-volver");
    if (boton) {
        boton.style.display = Router.pantallaActual === "inicio" ? "none" : "block";
    }
}

window.Router = Router;
window.cambiarPantalla = cambiarPantalla;
window.volverPantalla = volverPantalla;
window.irAlInicio = irAlInicio;
